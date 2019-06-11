function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('アクション');  // Uiクラスからメニューを作成する
  menu.addItem('私立候補作成', 'Main');   // メニューにアイテムを追加する
  menu.addItem('並べ替え', 'Main2'); 
  menu.addToUi();                            // メニューをUiクラスに追加する
}