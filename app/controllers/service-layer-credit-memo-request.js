const { getSLConnection } = require("../helper/service-layer-login.js");
const serviceLayerHelper = require("../helper/service-layer-credit-memo-request.js");
const invoieHelper = require("../helper/invoice.js");
const { getNumberingSeries } = require("../helper/numbering-series.js");
const { objectCodes, portalModules, enableStoreBasedNumbering } = require("../config/config.js");

const create = async (req, res, next) => {
  try {
    let creditMemoRequest = {};
    let invoiceUpdateRequest = {};

    const salesReturnData = JSON.parse(req.body.salesReturnData);
    console.log("req.body.salesReturnData", salesReturnData)
    if (Array.isArray(salesReturnData) && salesReturnData.length > 0) {
      creditMemoRequest = salesReturnData[0];
      invoiceUpdateRequest = salesReturnData[1];
    }
    const attachmentFile = req.file;
    console.log("request Data", attachmentFile);
    if (enableStoreBasedNumbering) {
      // Get Numbering Series.
      let seriesResponse = await getNumberingSeries(objectCodes[portalModules.CREDIT_MEMO_REQUEST], req.session.userSessionLog.storeLocation)
      if (seriesResponse) {
        console.log("seriesResponse series:", seriesResponse.Series)
        creditMemoRequest.Series = seriesResponse.Series;
      }
    }
    const cookie = await getSLConnection(req);
    const response = await serviceLayerHelper.createCreditMemoRequest(creditMemoRequest, cookie);

    // Update Remaining Qty in the Invoice rec.
    if (invoiceUpdateRequest) {
      const invoiceResponse = invoieHelper.updateRemainingQuantity(invoiceUpdateRequest);
    }
    console.log("attachmentFile", attachmentFile)
    if (attachmentFile) {
      const attachRes = await updateAttach(req, response.DocEntry, cookie);
      if (attachRes) {
        console.log("Attachment updated")
      }
    }
    res.status(200).send({ DocNum: response.DocNum, DocEntry: response.DocEntry });
    //res.status(200).send("checked"); //added for testing
  }
  catch (error) {
    console.log("create CreditMemoRequest Controller: " + JSON.stringify(error));
    next(error);
  }
}

//const updateAttach = async (req, res, next) => {
const updateAttach = async (req, docEntry, cookie) => {
  try {
    //const cookie = await getSLConnection(req);
    let attchResponse = {};
    //if (req.file) {
    //console.log("attchment request body data: ", JSON.stringify(req.body))
    //console.log("attchment request: ", req.file.attachments)
    attchResponse = await serviceLayerHelper.updateInvoiceAttachment(req, docEntry, cookie);
    //console.log("attchment Response: ", attchResponse)
    //}
    //res.status(200).send(attchResponse);
    return attchResponse;
  }
  catch (error) {
    console.log("create Invoice: " + JSON.stringify(error));
    //next(error);
  }
}

module.exports = { create };
