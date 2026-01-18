// CONTACT FORM - With IP tracking
var SPREADSHEET_ID = '1TrNdkzap5TqNMpwxz_79RgcixyWS6c-L2W5h9JBmBJ8';

function doPost(e) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheets()[0];

  // Get data from form (check e exists first)
  var data = (e && e.parameter) ? e.parameter : {};

  // IP from frontend
  var ipAddress = data.ip || 'Unknown';

  sheet.appendRow([
    new Date(),
    data.name || 'no name',
    data.email || 'no email',
    data.subject || 'no subject',
    data.category || 'no category',
    data.message || 'no message',
    ipAddress
  ]);

  return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
}

function doGet() {
  return ContentService.createTextOutput('API working').setMimeType(ContentService.MimeType.TEXT);
}

function simpleTest() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheets()[0];
  sheet.appendRow([new Date(), 'DIRECT TEST', 'test@test.com', 'Test', 'General', 'Hello', '127.0.0.1']);
}
