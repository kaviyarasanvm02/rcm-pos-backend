const { serviceLayerAPI } = require("../config/service-layer-api");
const { portalModules, serviceLayerApiURIs } = require("../config/config");
const helper = require("../helper/credit-memo-request.js");

const moduleName = portalModules.CREDIT_MEMO_REQUEST;
const serviceLayerURI = serviceLayerApiURIs[moduleName];
const attachServiceLayerURI = portalModules.ATTACHMENTS;
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const multer = require('multer');

// Multer setup to handle image file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

exports.createCreditMemoRequest = async(request, cookie) => {
  try {
    if(request.branchId) {
      request.BPL_IDAssignedToInvoice = request.branchId; //BranchID
      delete request.branchId;
    }

    console.log("*** CreditMemoRequest request: "+JSON.stringify(request));
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(serviceLayerURI, request);
    console.log(`Create CreditMemoRequest response: ${JSON.stringify(response.data)}`);

    if(response.data) {
      return response.data;
    }
    return;
  }
  catch(error){
    console.log("Create CreditMemoRequest error: "+ error);
    throw error;
  }
}

exports.updateInvoiceAttachment = async (request, docEntry, cookie) => {
  try {
      console.log("*** Invoice Attachment request: start ");
      if (!request.file) {
          console.warn("*** Unexpected response status:", "No file uploaded");
          return { message: "Invoice Attachment: No file uploaded!", status: 200, success: false };
      }
      console.log("*** File details:", request.file);
      serviceLayerAPI.defaults.headers.Cookie = cookie;
      const imageBuffer = request.file.buffer;
      const originalName = request.file.originalname;
      
      const fileExtension = path.extname(originalName).replace(".", ""); // Remove dot from extension
      const fileName = path.basename(originalName, "." +fileExtension); // Get filename without extension
      const fullFileName = originalName; // Full filename with extension

      // Define source directory
      //const source_dir = path.join(attachmentPath, "assets/attachment");
      const attachPath = await helper.getAttachmentPath()
      //const source_dir = "\\\\172.18.20.94\\sapshared\\";
      const source_dir = attachPath.AttachPath;
	    //const source_dir = "C:\\Attach";
      console.log("source_dir", source_dir);

      // if (!fs.existsSync(source_dir)) {
      //     fs.mkdirSync(source_dir, { recursive: true }); // Create folder if it doesn't exist
      // }
       // Define full file path
      const fullFilePath = path.join(source_dir, originalName);
      console.log("fullFilePath: *** "+ fullFilePath + " = " + imageBuffer);
      // Save the file to the source directory
      fs.writeFileSync(fullFilePath, imageBuffer);
      console.log(`*** File saved successfully at ${fullFilePath}`);

      // Attach PDF to SAP Invoice
      const att_pdf = {
          "Attachments2_Lines": [{
              "FileExtension": fileExtension,
              "SourcePath": source_dir, //source_dir.replace(/\\/g, "/"),
              "FileName": fileName
          }
        ]
      }
      let response = {};
      let absEntry;
      // Set proper headers
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      console.log("att_pdf", att_pdf)
      //const invoiceData = await helper.getAttachmentEntry(request.query.docEntry)
      const invoiceData = await helper.getAttachmentEntry(docEntry)
      console.log("Invoice response", JSON.stringify(invoiceData))
      if (invoiceData && invoiceData?.AtcEntry !== null) {
          absEntry = invoiceData?.AtcEntry;
          console.log("Invoice Attachment Entry: ", JSON.stringify(absEntry))
          response = await serviceLayerAPI.patch(`${attachServiceLayerURI}(${absEntry})`, att_pdf);
          if (response && response.status === 204) {
              console.log("*** Invoice Attachment updated successfully. No content in response.");
              return { message: "Invoice Attachment updated successfully.", status: 200 };
          }
      } else {
          //const response = await serviceLayerAPI.post(serviceLayerURI, request);
          console.log("Attachment Post API Calling");
          response = await serviceLayerAPI.post(attachServiceLayerURI, att_pdf, {headers});
          console.log("Attachment Post API Called");
          if (response.data) {
              console.log("Attachment Post Response:" + JSON.stringify(response.data));
              //return response.data;
              absEntry = response.data.AbsoluteEntry;
              const reqInvoice = {
                  AttachmentEntry: absEntry
              }
              //const invResponse = await serviceLayerAPI.patch(`${serviceLayerURI}(${request.query.docEntry})`, reqInvoice);
              const invResponse = await serviceLayerAPI.patch(`${serviceLayerURI}(${docEntry})`, reqInvoice);

              //console.log("*** Invoice Response: " + JSON.stringify(response));
              if (invResponse && invResponse.status === 204) {
                  console.log("*** Invoice Attachment and Invoice updated successfully. No content in response.");
                  return { message: "Invoice Attachment and Invoice updated successfully.", status: 200 };
              }
          }

      }

      // Handle unexpected status codes
      console.warn("*** Unexpected response status:", response.status);
      return { message: "Unexpected response from server.", status: response.status };
  }
  catch (error) {
      // Log error message and stack trace
      console.error("Invoice Attachment upload error:", error.response?.data || error.message);
      console.error(error.stack);
      //throw error;
  }
}

module.exports.upload = upload; 