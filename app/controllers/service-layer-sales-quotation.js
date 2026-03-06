const { getSLConnection, invalidateSLCache } = require("../helper/service-layer-login");
const serviceLayerHelper = require("../helper/service-layer-sales-quotation");
const serviceLayerSBSHelper = require("../helper/service-layer-sales-batch-selection");
const { enableFircaIntegration, objectCodes, portalModules, enableStoreBasedNumbering } = require("../config/config.js");
const { submitInvoicetoFirca } = require("../helper/invoice-to-firca.js");
const { updateSQSalesBatchSelection } = require("../helper/sales-quotation.js");
const { getNumberingSeries } = require("../helper/numbering-series.js");

const create = async (req, res, next) => {
  try {
    let docNum = "";
    const companyCode = req.body.CompanyCode ? req.body.CompanyCode : "";
    if (enableStoreBasedNumbering) {
      // Get Numbering Series.
      let seriesResponse = await getNumberingSeries(objectCodes[portalModules.SALES_QUOTATION], req.session.userSessionLog.storeLocation)
      if (seriesResponse) {
        console.log("seriesResponse series:", seriesResponse.Series)
        req.body.Series = seriesResponse.Series;
      }
    }
    let cookie = await getSLConnection(req);
    let response;
    try {
      response = await serviceLayerHelper.createSalesQuotation(req.body, cookie);
    } catch (error) {
      if (error?.response?.status === 401) {
        console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying...");
        invalidateSLCache(req);
        cookie = await getSLConnection(req);
        response = await serviceLayerHelper.createSalesQuotation(req.body, cookie);
      } else {
        throw error;
      }
    }

    if (response.DocNum) {
      docNum = response.DocNum;

      if (enableFircaIntegration) {
        // Submit the invoice to firca.
        let isInvoiceSubmitted = await submitInvoicetoFirca(response.DocEntry, companyCode, "SalesQuotation")
      }
    }

    if (Array.isArray(req.body.salesBatchSelection) && req.body.salesBatchSelection.length > 0) {
      const responseSBS = await createSQSalesBatchSelection(
        response.DocEntry, response.DocNum, req.body.salesBatchSelection, cookie);
    }

    res.status(200).send({ docNum });
  }
  catch (error) {
    console.log("create SalesQuotation Controller: ", error?.response?.data || error.message);
    next(error);
  }
}

const createSQSalesBatchSelection = async (quotationDocEntry, quotationDocNum, sbsRequest, cookie) => {
  try {
    let docNum = [];
    const response = await serviceLayerSBSHelper.createSalesBatchSelection(
      sbsRequest, quotationDocEntry, quotationDocNum, cookie);
    if (response.length > 0) {
      response.forEach(async (item) => {
        const updateInvNumResponse = await updateSQSalesBatchSelection(item, quotationDocEntry)
      });
      docNum.push(response.DocNum);
    }
    return docNum;
  }
  catch (error) {
    console.log("create SalesQuotation SalesBatchSelection: ", error?.response?.data || error.message);
    throw error;
  }
}

const update = async (req, res, next) => {
  try {
    let cookie = await getSLConnection(req);

    // Helper to run updates with 401 retry 
    const executeWithRetry = async (actionFn) => {
      try {
        return await actionFn(cookie);
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying...");
          invalidateSLCache(req);
          cookie = await getSLConnection(req);
          return await actionFn(cookie);
        }
        throw error;
      }
    };

    // DocNum's sole purpose is to be sent back with `success` response.
    // const docNum = req.body.DocNum;
    // delete req.body.DocNum;
    // If any line item is deleted, we neeed to write a logic to delete the associated line item.
    if (req.body.ItemsDeleted && req.body.ItemsDeleted.length > 0) {
      try {
        console.log("Sales Quotation delete in Service Layer.", req.body.ItemsDeleted);
        const { DocEntry } = req.body;
        console.log(`Processing deletion of line items from Quotation ${DocEntry}:`, JSON.stringify(req.body.ItemsDeleted));

        // Get latest Sales Quotation from Service Layer
        const quotation = await executeWithRetry((c) => serviceLayerHelper.getSalesQuotation(DocEntry, c));

        console.log("Fetched Quotation for update:", JSON.stringify(quotation));
        if (!quotation || !quotation.DocumentLines) {
          console.log("Fetched Quotation Error: ", JSON.stringify(quotation));
          throw new Error("Quotation not found or invalid structure");
        }

        // Remove deleted lines by matching LineNum
        const deletedLineNums = req.body.ItemsDeleted.map(item => item.LineNum);
        quotation.DocumentLines = quotation.DocumentLines.filter(
          line => !deletedLineNums.includes(line.LineNum)
        );
        console.log("Quotation after removing deleted lines:", JSON.stringify(quotation));

        //  Send updated payload back via PUT
        const putResult = await executeWithRetry((c) => serviceLayerHelper.putSalesQuotation(DocEntry, quotation, c));
        console.log("PUT Result after deleting lines:", putResult);
        if (!putResult) {
          throw new Error("Failed to update quotation after deleting lines");
        }

        console.log(`Deleted line items [${deletedLineNums}] successfully from Quotation ${DocEntry}`);
      } catch (err) {
        console.error("Error while deleting line items:", err.message);
        throw err; // Let middleware handle the error response
      }
    }

    console.log("Performing Sales Quotation Patch operation.");
    const isUpdated = await executeWithRetry((c) => serviceLayerHelper.updateSalesQuotation(req.body, c));

    if (isUpdated) {
      // Update OSBS table
      const { salesBatchSelection } = req.body;
      if (Array.isArray(salesBatchSelection) && salesBatchSelection.length > 0) {
        const results = await Promise.all(
          salesBatchSelection.map(request => {
            if (request.DocEntry) {
              return executeWithRetry((c) => serviceLayerSBSHelper.updateSalesBatchSelection(request, c));
            } else {
              return executeWithRetry((c) => serviceLayerSBSHelper.createSalesBatchSelection(request, "", req.body.DocNum, c));
            }
          })
        );
      }

      // res.status(200).send({ success: true, message: "The record has been updated successfully." });
      res.status(200).send({ docNum: req.body.DocNum });
    }
    else {
      res.status(500).send({ success: false, message: "Failed to update the record." });
    }
  }
  catch (error) {
    console.log("Update SalesQuotation Controller: ", error?.response?.data || error.message);
    next(error);
  }
}

module.exports = { create, update };
