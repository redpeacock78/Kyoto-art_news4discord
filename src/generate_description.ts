function generate_description<T extends string>(URL: T): T {
  //URL先のHTMLをFetchして改行を基準に配列化
  const url_resp: string[] = UrlFetchApp.fetch(URL)
    .getContentText()
    .split(/\r\n|\r|\n/);

  //抜粋開始行数と終了行数の取得
  const get_line_number = (search_word: string): number => {
    return url_resp.indexOf(search_word);
  };
  const start: number = get_line_number(
    '                              <div class="post-main-block ve">'
  );
  const middle: number = get_line_number(
    '                              <div class="post-sub-block ve">'
  );
  const last: number = get_line_number("      </main>");

  //HTMLの抜粋とHTMLタグの除去及びHTMLエンティティのアンエスケープ処理、冒頭・文末の連続スペースの除去・連続スペースの統合
  const html_tag = new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/g);
  const html_excerpt_tag_removal = (
    S: number,
    E: number,
    tag: RegExp
  ): string => {
    return url_resp
      .slice(S, E)
      .join("")
      .replace(tag, "");
  };
  const main_text: string = html_excerpt_tag_removal(start, middle, html_tag);
  const sub_text: string = html_excerpt_tag_removal(middle, last, html_tag);
  const texts_block: string = XmlService.parse(
    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <d>
       ${main_text}
       ${sub_text}
      </d>`
  )
    .getRootElement()
    .getText()
    .replace(/^\s+|\s+$/g, "")
    .replace(/\s+/g, " ");

  //文字コード・サロゲートペア・異体字セレクタ等を考慮した上での指定文字数での切り出し
  const chara_count: string[] = Array.from(texts_block);
  return chara_count.length > 120
    ? (`${chara_count.slice(0, 120).join("")}...` as T)
    : (texts_block as T);
}
