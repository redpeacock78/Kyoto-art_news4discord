function generate_description(URL) {
  //URL先のHTMLをFetchして改行を基準に配列化
  const url_resp = UrlFetchApp.fetch(URL)
    .getContentText()
    .split(/\r\n|\r|\n/);
  //抜粋開始行数と終了行数の取得
  const start_num = url_resp.indexOf(
    '                              <div class="post-main-block ve">'
  );
  const last_num = url_resp.indexOf(
    '                              <div class="post-sub-block ve">'
  );
  //HTMLの抜粋とHTMLタグの除去及びHTMLエンティティのアンエスケープ処理、冒頭・文末の連続スペースの除去・連続スペースの統合
  const text_block = XmlService.parse(
    "<d>" +
      url_resp
        .slice(start_num, last_num)
        .join("")
        .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "") +
      "</d>"
  )
    .getRootElement()
    .getText()
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ");
  //文字コード・サロゲートペア・異体字セレクタ等を考慮した上での指定文字数での切り出し
  const comp_text = text_block => {
    return Array.from(text_block).length > 120
      ? Array.from(text_block)
          .slice(0, 120)
          .join("") + "..."
      : text_block;
  };

  return comp_text(text_block);
}
