function generate_description(URL) {
  //Underscore for GAS: M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
  const _ = Underscore.load();

  //URL先のHTMLをFetchして&nbsp;などを通常のスペースに置換した上で改行を基準に配列化
  const nbsp = String.fromCharCode(160);
  const ensp = String.fromCharCode(8194);
  const emsp = String.fromCharCode(8195);
  const thinsp = String.fromCharCode(8201);
  const url_resp = UrlFetchApp.fetch(URL)
    .getContentText()
    .split(nbsp)
    .join(" ")
    .split(ensp)
    .join(" ")
    .split(emsp)
    .join(" ")
    .split(thinsp)
    .join(" ")
    .split(/\r\n|\r|\n/);
  //抜粋開始行数と終了行数の取得
  const start_num = url_resp.indexOf(
    '                              <div class="post-main-block ve">'
  );
  const last_num = url_resp.indexOf(
    '                              <div class="post-sub-block ve">'
  );
  //HTMLの抜粋とHTMLタグの除去及びHTMLエンティティのアンエスケープ処理、冒頭・文末の連続スペースの除去
  const text_block = _.unescape(
    url_resp
      .slice(start_num, last_num)
      .join("")
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
  ).replace(/^ +| +$/g, "");
  //文字コード・サロゲートペア・異体字セレクタ等を考慮した上での指定文字数での切り出し
  const comp_text = text_block => {
    return Array.from(text_block).length > 90
      ? Array.from(text_block)
          .slice(0, 90)
          .join("") + "..."
      : text_block;
  };

  return comp_text(text_block);
}
