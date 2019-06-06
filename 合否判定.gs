function pass_need() {
   //①抽出する操作
   var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = spreadsheet.getSheetByName("私立高校(３学期制)2");
   
   //その生徒のそれぞれの数値を取得
   var selfnums = sheet.getRange(3, 5, 1, 17).getValues();
   var num135 = selfnums[0][0];
   var num45 = selfnums[0][2];
   var num75 = selfnums[0][4];
   var num50 = selfnums[0][6];
   var num25 = selfnums[0][8];
   var num15 = selfnums[0][10];
   
   //基準値を抽出する
   var data = sheet.getRange(8, 5, 8, 8).getValues();  
   var school = [];
   var reg = /英|[英数漢]検|かつ|または|([0-9]+)|(\/[0-9]+)/g;
   for(var i = 0; i < 7; i++ ) {
     school[i] = [];
     for(var j = 0; j < 1; j++) {
       school[i] = data[i][0].match(reg);
     }
     
   }
  
   //②判定する操作
   var andStr = [];
   var orStr = [];
   var out = ["英","英検","数検","漢検"]; 
   
   for(var k = 0; k < 7; k++){
     for(var l = 0; out.length; l++) {
       if(school[k].indexOf(out[l]) == 1) {
         break;
       }
     }
     if(school[k].indexOf("かつ") != -1) {
       var result = school[k].indexOf("かつ");
       if(school[k].indexOf("かつ", result + 1)) {
       }
     } 
   }
   
}
