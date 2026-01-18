// NEWSLETTER SUBSCRIPTIONS - With IP tracking
// Replace with your spreadsheet ID
var SPREADSHEET_ID = 'YOUR_NEWSLETTER_SPREADSHEET_ID';

function doPost(e) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheets()[0];

  // Get data from form (check e exists first)
  var data = (e && e.parameter) ? e.parameter : {};

  // IP from frontend (ipify.org)
  var ipAddress = data.ip || 'Unknown';

  // Ensure sheet has headers if empty
  var lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    sheet.appendRow(['Timestamp', 'Email', 'Source', 'IP Address']);
  }

  sheet.appendRow([
    new Date(),
    data.email || 'no email',
    'Website Newsletter',
    ipAddress
  ]);

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return ContentService.createTextOutput('Newsletter API working').setMimeType(ContentService.MimeType.TEXT);
}

function simpleTest() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheets()[0];
  sheet.appendRow([new Date(), 'test@example.com', 'Direct Test', '127.0.0.1']);
}
