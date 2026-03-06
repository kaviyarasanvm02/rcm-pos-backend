const { getSLConnection, invalidateSLCache } = require("../helper/service-layer-login.js");
const serviceLayerHelper = require("../helper/service-layer-invoice.js");
const serviceLayerIPHelper = require("../helper/service-layer-incoming-payment.js");
const serviceLayerSBSHelper = require("../helper/service-layer-sales-batch-selection.js");
const serviceLayerJEHelper = require("../helper/service-layer-journal-entry.js");
const cashDenominationService = require("../entities/services/cash-denominations.service.js")
const { formatDate } = require("../utils/utils.js");
const { trxTypes, defaultBranchId, fircaIntegrationWaitTime, enableFircaIntegration, objectCodes, portalModules, enableStoreBasedNumbering, isHomeDeliveryEnabled } = require("../config/config.js");
const { submitInvoicetoFirca } = require("../helper/invoice-to-firca.js");
const { getFircaQRCodeDataURI, getUDFData, updateSalesBatchSelection, updateTransRef, getUniqueId } = require("../helper/invoice.js");
const { getNumberingSeries } = require("../helper/numbering-series.js");
const { getItemDetails, getTimberItemDetails } = require("../helper/invoice.js");

const create = async (req, res, next) => {
  try {
    if (req.body.invoice) {
      let response = {};
      let ipDocEntry = "";
      let uniqueData = {};
      const cookie = await getSLConnection(req);
      let generateDeliveryCode;

      const request = req.body.invoice;
      const companyCode = request.CompanyCode ? request.CompanyCode : "";
      if (isHomeDeliveryEnabled && request.U_IsHomeDelivery === "Y") {
        generateDeliveryCode = Math.floor(100000 + Math.random() * 900000);
        request.U_DeliveryCode = generateDeliveryCode;
      }
      //If Branch will be dynamically changed by login. below logic is hardcoded Branch.
      //let branchId = defaultBranchId;
      // if(request.branchId) {
      //   branchId = request.branchId;
      //   delete request.branchId;
      // }

      if (enableStoreBasedNumbering) {
        // Get Numbering Series.
        let seriesResponse = await getNumberingSeries(objectCodes[portalModules.INVOICE], req.session.userSessionLog.storeLocation)
        if (seriesResponse) {
          console.log("seriesResponse series:", seriesResponse.Series)
          request.Series = seriesResponse.Series;
        }
      }

      let uniqueResponse = await getUniqueId(request.Unique)
      if (!uniqueResponse?.DocNum) {
        //request.BPL_IDAssignedToInvoice = branchId;
        let invoiceResponse;
        try {
          invoiceResponse = await serviceLayerHelper.createInvoice(request, cookie);
        } catch (error) {
          if (error?.response?.status === 401) {
            console.log("*** 401 Unauthorized from SL (Invoice) - Invalidating cache and retrying...");
            invalidateSLCache();
            const newCookie = await getSLConnection(req);
            invoiceResponse = await serviceLayerHelper.createInvoice(request, newCookie);
          } else {
            throw error;
          }
        }

        // Create Incoming Payment when a payment is done via Card or CC. Skip this when an Invoice is created 
        // based on a Credit Purchase
        if (invoiceResponse.DocEntry) {
          response.DocNum = invoiceResponse.DocNum;
          response.DocEntry = invoiceResponse.DocEntry;
          response.isExist = false;

          if (req.body.incomingPayment) {
            if (enableStoreBasedNumbering) {
              // Get Numbering Series.
              let seriesResponse = await getNumberingSeries(objectCodes[portalModules.INCOMING_PAYMENT], req.session.userSessionLog.storeLocation)
              if (seriesResponse) {
                console.log("seriesResponse series:", seriesResponse.Series)
                req.body.incomingPayment.Series = seriesResponse.Series;
              }
            }
            const ipResponse = await processPayment(invoiceResponse.DocEntry, req.body.incomingPayment, cookie);
            if (ipResponse) {
              response.IncomingPaymentDocNum = ipResponse.DocNum;
              ipDocEntry = ipResponse.DocEntry;

              if (req.body?.journalEntry) {
                const journalResponse = await processJournalEntry(
                  req.body.journalEntry, invoiceResponse.DocNum, ipResponse.DocNum, cookie);
                response.JournalEntryDocNum = journalResponse?.JdtNum;
              }
            }
          }

          if (enableFircaIntegration) {
            // Submit the invoice to firca.
            let isInvoiceSubmitted = await submitInvoicetoFirca(invoiceResponse.DocEntry, companyCode, "Invoice")
            if (isInvoiceSubmitted) {
              const qrCodeDataURI = await getFircaQRCodeDataURI(invoiceResponse.DocNum);
              console.log("qrCodeDataURI", qrCodeDataURI);
              response.qrCode = qrCodeDataURI;
            }
          }
          const responseUDFData = await getUDFData(invoiceResponse.DocNum);
          if (responseUDFData) {
            response.InvCount = responseUDFData.U_InvCount;
            response.SDCTime = responseUDFData.U_SDCTime;
            response.SDCInvNum = responseUDFData.U_SDCInvNum;
            response.VehicleNo = responseUDFData.U_VehicleNo;
          }
        }
      } else {
        console.log("uniqueResponse unique:", uniqueResponse?.DocNum)
        response.DocNum = uniqueData.DocNum;
        response.DocEntry = uniqueData.DocEntry;
        response.isExist = true;
      }
      console.log("*************invoiceSalesBatchResponse start************ ")
      if (req.body.salesBatchSelection.length > 0) {
        const responseSBS = await createSalesBatchSelection(response.DocEntry, response.DocNum, req.body.salesBatchSelection, cookie);
        console.log("*************invoiceSalesBatchResponse************: ", responseSBS)
        // if(responseSBS) {
        //   const response = dbHelper.executeBatchInsertUpdate(query.updateInvoiceItem, updateRequest);
        // }
      }
      console.log("*************invoiceSalesBatchResponse end************ ")
      if (req.body.invoice.U_PaymentType === "Card") {
        console.log("*************CreditCard Management referenece start************ ")
        if (req.body.incomingPayment?.TransferReference && req.body.incomingPayment?.TransferReference !== "") {
          console.log("*************CreditCard Management referenece************: ", ipDocEntry + " - " + req.body.incomingPayment.TransferReference)
          const responseTransRef = await updateTransRef(ipDocEntry, req.body.incomingPayment?.TransferReference);
          console.log("*************CreditCard Management referenece************: ", responseTransRef)
        }
        console.log("*************CreditCard Management referenece end************ ")
      }
      if (response.DocNum) {
        const itemDetails = getItemDetails({ docNum: response.DocNum });
        response.itemList = itemDetails;
      }
      if (response.DocEntry) {
        const timItems = getTimberItemDetails(response.DocEntry);
        response.timItemList = timItems;
      }
      res.status(200).send(response);
    }
    else {
      res.status(400).send({ message: "Invalid Request. Missing 'invoice' property!" });
    }
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    next(error);
  }
}

/**
 * Create Incoming Payment
 * @param {*} invoiceDocEntry Invoice DocEntry
 * @param {*} ipRequest   IP request
 * @param {*} cookie
 * 
 * @returns Incoming Payment response
 */
const processPayment = async (invoiceDocEntry, ipRequest, cookie) => {
  try {
    ipRequest.PaymentInvoices[0].DocEntry = invoiceDocEntry;
    if (Array.isArray(ipRequest.PaymentChecks) && ipRequest.PaymentChecks.length > 0) {
      ipRequest.PaymentChecks[0].DueDate = formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2");
    }
    const ipResponse = await serviceLayerIPHelper.createIncomingPayment(ipRequest, cookie);
    return ipResponse;
  }
  catch (err) {
    throw err;
  }
}

/**
 * Create Journal Entry
 * @param {*} request       Journal Entry request
 * @param {*} invoiceDocNum Invoice DocNum
 * @param {*} ipDocNum Incoming Payment DocNum
 * @param {*} cookie
 * 
 * @returns Journal Entry response
 */
const processJournalEntry = async (request, invoiceDocNum, ipDocNum, cookie) => {
  const today = formatDate(new Date(), "YYYY-MM-DD HH24:MI:SS.FF2");

  try {
    request.Reference = invoiceDocNum;
    request.Reference2 = ipDocNum;
    request.TaxDate = today;
    request.DueDate = today;
    request.ReferenceDate = today;

    const jeResponse = await serviceLayerJEHelper.createJournalEntry(request, cookie);
    return jeResponse;
  }
  catch (err) {
    throw err;
  }
}

const createSalesBatchSelection = async (invoiceDocEntry, invoiceDocNum, sbsRequest, cookie) => {
  try {
    let docNum = [];
    //const cookie = await getSLConnection(req);
    console.log("********* createSalesBatchSelection ****request: ", sbsRequest)
    const response = await serviceLayerSBSHelper.createSalesBatchSelection(sbsRequest, invoiceDocEntry, invoiceDocNum, cookie);
    //console.log("*************invoiceResponse************: ", invoiceResponse)
    if (response.length > 0) {
      response.forEach(async (item) => {
        const updateInvNumResponse = await updateSalesBatchSelection(item, invoiceDocEntry)
      });
      docNum.push(response.DocNum);
    }
    return docNum;
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    throw error;
  }
}

const update = async (req, res, next) => {
  try {
    if (req.body) {
      let response = {};
      const cookie = await getSLConnection(req);
      let generateDeliveryCode;

      const request = req.body;
      request.U_DeliveryStatus = request.U_DeliveryStatus || "DELIVERED";
      request.U_IsPaymentReceived = request.U_IsPaymentReceived || "Y";

      console.log("*************request: ", request)
      const invoiceResponse = await serviceLayerHelper.updateInvoice(request, cookie);
      //console.log("*************invoiceResponse************: ", invoiceResponse)
      if (!invoiceResponse || invoiceResponse.status === 200 || invoiceResponse.DocEntry) {
        response.DocNum = request.DocNum;
        response.DocEntry = request.DocEntry
        response.message = invoiceResponse.message;
        const attachRes = await updateAttach(req, cookie);
        if (attachRes) {
          console.log("Attachment updated")
        }
      }
      res.status(200).send(response);
    }
    else {
      res.status(400).send({ message: "Invalid Request. Missing 'invoice' property!" });
    }
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    next(error);
  }
}

//const updateAttach = async (req, res, next) => {
const updateAttach = async (req, cookie) => {
  try {
    //const cookie = await getSLConnection(req);
    let attchResponse = {};
    //if (req.file) {
    console.log("attchment request body data: ", JSON.stringify(req.body))
    console.log("attchment request: ", req.file.Attachment)
    attchResponse = await serviceLayerHelper.updateInvoiceAttachment(req, cookie);
    console.log("attchment Response: ", attchResponse)
    //}
    //res.status(200).send(attchResponse);
    return attchResponse;
  }
  catch (error) {
    console.log("create Invoice: ", error?.response?.data || error.message);
    //next(error);
  }
}

module.exports = { create, update, updateAttach };
