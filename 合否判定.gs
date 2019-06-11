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
   for(var i = 0; i < 8; i++ ) {
     school[i] = [];
     for(var j = 0; j < 1; j++) {
       school[i] = data[i][0].match(reg);
     }
     
   }
  
   //②判定する操作
   var judgeData = [];
   var finalJudgment;
   var r = 8;
   
   for(var k = 0; k < 8; k++, r++){
     if(significanceTest(school[k]) == 1) {//検定があるものは評価しない
       finalJudgment = "";
     } else if(school[k].indexOf("かつ") != -1) {   //「かつ」が２以上あるものは評価しない
       var result = school[k].indexOf("かつ");
       if(school[k].indexOf("かつ", result + 1) != -1) {
         continue;
       } else {
         judgeData = school[k].filter(function(a) {
         return a !== "かつ";
         });
         finalJudgment = andJudgment(num135, num45, num75, num50, num25, num15, judgeData);
       }
     } else if(school[k].indexOf("または") != -1) {　　　　//「または」の場合
       judgeData = school[k].filter(function(b) {
         return b !== "または";
       });
       finalJudgment = orJudgment(num135, num45, num75, num50, num25, num15, judgeData);
     } else {
       judgeData = school[k];
       finalJudgment = normalJudgment(num135, num45, num75, num50, num25, num15, judgeData);
     }
     sheet.getRange(r, 14).setValue(finalJudgment);
   }
   
}

function significanceTest(school){
  var out = ["英","英検","数検","漢検"]; 
  for(var i = 0; i < out.length; i++) {
    if(school.indexOf(out[i]) != -1) {
      return 1;
    }
  }
  return 0;
}
