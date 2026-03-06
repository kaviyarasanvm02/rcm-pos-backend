const dbHelper = require('../helper/db');
const { buildHeaderRecQuery, buildRowLevelQuery} = require("../utils/query.util.js");
const query = require("../config/query-invoice.js");
const { getQRCodeDataURI } = require("../utils/qr-code.util.js");

/**
 * Get the list of all Invoices
 * @param {Object} req  `req.fromDate, req.toDate, req.cardCode, req.docStatus, req.searchKey,
 *                      req.pageNum, req.pageSize`
 */
exports.getInvoices = (req) => {
  try {
    const sql = buildHeaderRecQuery(query.invoice, req, [`T0."U_CODCntName"`]);
    console.log("getSalesQuotation- sql: ", sql);
    const rows = dbHelper.executeWithValues(sql);
    // console.log("getSalesQuotation- rows: "+JSON.stringify(rows));
    return rows;
  }
  catch (err) {
    console.log("getInvoices - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

exports.updateInvoiceReprintStatus = (docEntry) => {
  try {
    //const sql = buildHeaderRecQuery(query.invoice, req, [`T0."U_CODCntName"`]);
    const rows = dbHelper.executeWithValues(query.updateInvoiceReprintStatus, [docEntry]);
    console.log("updateInvoiceReprintStatus %s", JSON.stringify(rows));
    return true;
  }
  catch (err) {
    console.log("getInvoices - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the list of Items under an Invoice
 * @param {Object} req   `req.docNum, req.lineStatus`
 */
exports.getItemDetails = (req) => {
  try {
    const sql = buildRowLevelQuery(query.itemListForInvoice, req);
    const itemsList = dbHelper.executeWithValues(sql, []);
    // console.log("getItemDetails- controller: "+JSON.stringify(itemsList));
    return { itemsList };
  }
  catch (err) {
    console.log("getItemDetails - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the list of Timber Items under an Invoice
 * @param {Object} req   `req.docEntry`
 */
exports.getTimberItemDetails = (docEntry) => {
  try {
    const sql = query.getTimberItems;
    const itemsList = dbHelper.executeWithValues(sql, [docEntry]);
    // console.log("getTimberItemDetails- controller: "+JSON.stringify(itemsList));
    return { itemsList };
  }
  catch (err) {
    console.log("getTimberItemDetails - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

exports.getAttachmentEntry = (docEntry) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceAttachmentEntry, [docEntry]);
    if(Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  } catch (err) {
    console.log("getAttachmentEntry - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA Verification Info for an Invoice
 * @param {Number} docNum
 */
exports.getFircaInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceFircaURL, [docNum]);
    if(Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getFircaInfo - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the Delivery Code Info for an Invoice
 * @param {Number} docNum
 */
exports.getDeliveryInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceDeliveyCodeData, [docNum]);
    if(Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getDeliveryInfo - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA Verification Info for an Invoice
 * @param {Number} docNum
 */
exports.getUDFInfo = (docNum) => {
  try {
    const results = dbHelper.executeWithValues(query.invoiceUDFData, [docNum]);
    if(Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  }
  catch (err) {
    console.log("getUDFInfo - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}



/** 
 * Update the TransRef field by reference Info for an IP
 * @param {ipDocEntry, referenece} - incoming payment, reference
 */
exports.updateTransRef = (ipDocEntry, referenece) => {
  try {
    const results = dbHelper.executeWithValues(query.updateTransRef, [referenece, ipDocEntry]);
    return results;
  }
  catch (err) {
    console.log("updateTransRef - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA QR Code for an Invoice
 * @param {Number} docNum
 */
exports.getFircaQRCodeDataURI = async (docNum) => {
  try {
    const results = this.getFircaInfo(docNum);
    console.log("getFircaQRCode - url: "+JSON.stringify(results));

    let qrCodeBase64;
    if(results && results.U_VerifyURL) {
      qrCodeBase64 = await getQRCodeDataURI(results.U_VerifyURL);
    }
    return qrCodeBase64;
  }
  catch (err) {
    console.log("getFircaQRCode - helper: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the Delivery Code for an Invoice
 * @param {Number} docNum
 */
exports.getDeliveryCode = async (docNum) => {
  try {
    const results = this.getDeliveryInfo(docNum);
    console.log("get Delivery Code: "+JSON.stringify(results));
    return results;
  }
  catch (err) {
    console.log("getDeliveryCode - helper: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Get the FIRCA QR Code for an Invoice
 * @param {Number} docNum
 */
exports.getUDFData = async (docNum) => {
  try {
    const results = this.getUDFInfo(docNum);
    console.log("get UDF Data: "+JSON.stringify(results));
    return results;
  }
  catch (err) {
    console.log("get UDF Data - helper: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Updates the Remaining Qty in the Invoice Rows
 * @param {Array} req
 */
exports.updateRemainingQuantity = (req) => {
  try {
    if(Array.isArray(req) && req.length > 0) {
      const updateRequest = req.map(item => {
        return [item.U_ReturnedQty, item.U_RemainingOpenQty, item.DocEntry, item.LineNum];
      });
      
      console.log("updateRemainingQuantity- updateRequest: "+JSON.stringify(updateRequest));
      const response = dbHelper.executeBatchInsertUpdate(query.updateInvoiceItem, updateRequest);
      console.log("updateRemainingQuantity- response: "+JSON.stringify(response));
      return response;
    }
    return null;
  }
  catch (err) {
    console.log("getItemDetails - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

/** 
 * Updates the Invoice Reprit Status in the Invoice Rows
 * @param {Array} docEntry
 */
exports.updateReprint = (docEntry) => {
  try {
    if(docEntry) {
      const rows = dbHelper.executeWithValues(query.updateInvoiceReprintStatus, [docEntry]);
      console.log("updateInvoiceReprintStatus %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("InvoiceReprintStatus - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

exports.updateSalesBatchSelection = (item, docEntry) => {
  try {
    console.log("updateSalesBatchSelection %s", item.DocNum, docEntry, item.U_ItemCode);
    if(item) {
      const rows = dbHelper.executeWithValues(query.updateSalesBatchSelectionDocNum, [item.DocNum, docEntry, item.U_ItemCode]);
      console.log("updateSalesBatchSelection %s", JSON.stringify(rows));
      return true;
    }
    return null;
  }
  catch (err) {
    console.log("InvoiceReprintStatus - controller - error: "+ JSON.stringify(err.message));
    throw err;
  }
}

 exports.getUniqueId = (uniqueId) => {
    try {
      const results = dbHelper.executeWithValues(query.getUniqueId, [uniqueId]);
      if(Array.isArray(results) && results.length > 0) {
        return results[0];
      }
      return null;
    }
    catch (err) {
      console.log("getNumberingSeries - Helper - error: "+ JSON.stringify(err.message));
      throw err;
    }
  }