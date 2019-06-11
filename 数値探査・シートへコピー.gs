function CopyToSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("私立高校(３学期制)2");
  
  var grade = sheet.getRange("R5").getValue();
  var LastRow = sheet.getLastRow();
  if(sheet.getRange("G19") != "") {
    grade += sheet.getRange("G19").getValue();
  }
  
  sheet.getRange(LastRow + 1, 13).setValue("-1");
  
  var data = sheet.getRange(30, 1, LastRow, 13).getValues();
  
  var middle = 0;
  for(var i = 0; true; i++) {
    if(data[i][12] == -1) {
      if(data[i-1][12] > grade) {
        grade = data[i-1][12];
        i -= 2;
      } else {
        grade -= 1;
        i = 0;
      }
    } else if(data[i][12] == grade) {
      middle = i + 30;
      break;
    } 
  }
  
  var top = "";
  // middle から前後合計8つ取り出す 
  
  if(middle - 30 <= 2) {
    // middle より上に４つない場合
    top = 30;
  } else if(LastRow - middle <= 1) {
    // middle より下に3つない場合
    top = LastRow - 7;
  } else {
  // それ以外(通常)
    top = middle - 5;
  }
  
  //セル範囲を指定して貼り付ける。
  sheet.getRange(top, 1, 8, 12).copyTo(sheet.getRange("A8"), {contentsOnly:true});
  
  //行を削除
  sheet.deleteRows(29, 80);
  
  //行を追加しておく
  sheet.insertRowsAfter(29, 80);
  
}
