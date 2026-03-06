const { serviceLayerAPI } = require("../config/service-layer-api");
const { portalModules, serviceLayerApiURIs, attachmentPath } = require("../config/config");
const helper = require("../helper/invoice.js");

const moduleName = portalModules.INVOICE;
const serviceLayerURI = serviceLayerApiURIs[moduleName];
const attachServiceLayerURI = portalModules.ATTACHMENTS;
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const multer = require('multer');

// Multer setup to handle image file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

exports.createInvoice = async(request, cookie) => {
  try {
    console.log("*** Invoice request: "+JSON.stringify(request));
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.post(serviceLayerURI, request);
    // console.log(`Create Invoice response: ${JSON.stringify(response.data)}`);

    if(response.data) {
      return response.data;
    }
    return;
  }
  catch(error){
    console.log("Create Invoice error: "+ error);
    throw error;
  }
}

exports.updateInvoice = async (request, cookie) => {
  try {
    console.log("*** Invoice request: " + JSON.stringify(request));
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.patch(`${serviceLayerURI}(${request.DocEntry})`, request);
    //.patch(serviceLayerURI, request);
    //console.log("*** Invoice Response: " + JSON.stringify(response));
    if (response && response.status === 204) {
      console.log("*** Invoice updated successfully. No content in response.");
      return { message: "Invoice updated successfully.", status: 200 };
    }
    //return;
    // Handle unexpected status codes
    console.warn("*** Unexpected response status:", response.status);
    return { message: "Unexpected response from server.", status: response.status };
  }
  catch (error) {
    // Log error message and stack trace
    console.error("Create Invoice error:", error.message);
    console.error(error.stack);
    throw error;
  }
}

exports.updateInvoiceAttachment = async (request, cookie) => {
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
      //const pdfFilename = `${originalName}.pdf`;
      //console.log(`Converting image to PDF: ${fullFileName}`);
      // Convert image to PDF
      //const pdfPath = await convertImageToPDF(imageBuffer, pdfFilename);
      //console.log(`image to converted: ` + pdfPath);

      // Define source directory
      const source_dir = path.join(attachmentPath, "assets/attachment");
      if (!fs.existsSync(source_dir)) {
          fs.mkdirSync(source_dir, { recursive: true }); // Create folder if it doesn't exist
      }
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
              "SourcePath": source_dir.replace(/\\/g, "/"),
              "UserID": request.session.userId,
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
      //const invoiceData = await helper.getAttachmentEntry(request.query.docEntry)
      const invoiceData = await helper.getAttachmentEntry(request.body.DocEntry)
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
              const invResponse = await serviceLayerAPI.patch(`${serviceLayerURI}(${request.body.DocEntry})`, reqInvoice);

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

const convertImageToPDF = (imageBuffer, pdfFilename) => {
  return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const pdfPath = path.join(__dirname, "../assets/attachment",  pdfFilename);
      const stream = fs.createWriteStream(pdfPath);

      doc.pipe(stream);
      doc.image(imageBuffer, { fit: [500, 500], align: 'center', valign: 'center' });
      doc.end();

      stream.on('finish', () => resolve(pdfPath));
      stream.on('error', (err) => reject(err));
  });
};

// module.exports = { createInvoice };

module.exports.upload = upload; 
