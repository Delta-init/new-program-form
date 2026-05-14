function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Contact Number",
        "Existing Course",
        "New Programme Selected",
        "Terms Agreed",
      ]);

      // Style header row
      const header = sheet.getRange(1, 1, 1, 6);
      header.setBackground("#1a1a2e");
      header.setFontColor("#ffffff");
      header.setFontWeight("bold");
    }

    sheet.appendRow([
      new Date().toLocaleString("en-AE", { timeZone: "Asia/Dubai" }),
      data.name           || "",
      data.phone          || "",
      data.existingCourse || "",
      data.newProgramme   || "",
      data.termsAgreed    || "No",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
