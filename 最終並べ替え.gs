function sortList() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("私立高校(３学期制)2");
  
  var data = sheet.getRange("A8:N15").getValues();
  
  for(var i = 0; i < data.length; i++) {
    if(data[i][13] == "◯") {
      data[i][14] = 0;
    } else {
      data[i][14] = getMaxNum(data[i][13]);
    }
  }
  var r = 8
  data = data.sort(function(a,b){return(b[14] - a[14]);});
  for(var j = 0; j < data.length; j++, r++) {
    for(var k = 0; k < 5; k++) {
      sheet.getRange(r, k + 1).setValue(data[j][k]);
    }
    sheet.getRange(r, 14).setValue(data[j][13]);
  }
}

function getMaxNum(judgment){
  var reg = /(\+[0-9]+)/g;
  var nums = judgment.match(reg);
  nums = ListParseInt(nums);
  return Math.max.apply(null, nums);
}

function ListParseInt(list) {
  var newList = []
  for(var i = 0; true; i++) {
    if(list[i] == undefined) {
      break;
    }
    newList[i] = parseInt(list[i], 10);
  }
  return newList;
}