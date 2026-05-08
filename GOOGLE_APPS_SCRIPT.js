/**
 * GOOGLE APPS SCRIPT CODE
 * 
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Go to Extensions -> Apps Script.
 * 3. Delete any existing code and paste this script.
 * 4. Click "Deploy" -> "New Deployment".
 * 5. Select type: "Web App".
 * 6. Set "Execute as": "Me".
 * 7. Set "Who has access": "Anyone".
 * 8. Copy the "Web App URL" and paste it into your .env as VITE_APPS_SCRIPT_URL.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    
    // Get headers from first row
    var lastCol = sheet.getLastColumn();
    var headers = [];
    
    if (lastCol > 0) {
      headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    } else {
      // If sheet is totally empty, use keys from first submission as headers
      headers = Object.keys(data);
      sheet.appendRow(headers);
    }
    
    // Map data to headers
    var row = headers.map(function(header) {
      return data[header] !== undefined ? data[header] : "";
    });
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Indiwebpros Webhook is active.");
}
