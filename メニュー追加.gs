function onOpen() {
  var ui = SpreadsheetApp.getUi();           // Uiクラスを取得する
  var menu = ui.createMenu('アクション');  // Uiクラスからメニューを作成する
  menu.addItem('私立候補作成', 'makeList');   // メニューにアイテムを追加する
  menu.addToUi();                            // メニューをUiクラスに追加する
}