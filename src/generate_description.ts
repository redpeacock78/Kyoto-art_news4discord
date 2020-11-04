async function generate_description<T extends string>({
  URL,
}: {
  URL: T;
}): Promise<T> {
  //URL先のHTMLをFetchして改行を基準に配列化
  const url_resp = ({ url }: { url: string }): Promise<string[]> => {
    return new Promise((resolve: (value?: string[]) => void) => {
      resolve(
        UrlFetchApp.fetch(url)
          .getContentText()
          .split(/\r\n|\r|\n/)
      );
    });
  };
  const resp_array: string[] = await url_resp({ url: URL });

  //抜粋開始行数と終了行数の取得
  const get_line_number = ({
    search_word,
  }: {
    search_word: string;
  }): number => {
    return resp_array.indexOf(search_word);
  };
  const start: number = get_line_number({
    search_word:
      '                              <div class="post-main-block ve">',
  });
  const middle: number = get_line_number({
    search_word:
      '                              <div class="post-sub-block ve">',
  });
  const last: number | void = get_line_number({ search_word: "      </main>" });

  const login_start = get_line_number({
    search_word: '          <div class="login-box-wrap">',
  });
  const login_end = get_line_number({ search_word: "    </main>" });

  //HTMLの抜粋とHTMLタグの除去及びHTMLエンティティのアンエスケープ処理、冒頭・文末の連続スペースの除去・連続スペースの統合
  const html_tag = new RegExp(/<("[^"]*"|'[^']*'|[^'">])*>/g);
  const html_excerpt_tag_removal = ({
    start,
    end,
    tag,
  }: {
    start: number;
    end: number;
    tag: RegExp;
  }): string | void => {
    return resp_array.slice(start, end).join("").replace(tag, "");
  };
  const texts_block: string = XmlService.parse(
    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <d>
      ${html_excerpt_tag_removal({
        start: login_start,
        end: login_end,
        tag: html_tag,
      })}
       ${html_excerpt_tag_removal({ start: start, end: middle, tag: html_tag })}
       ${html_excerpt_tag_removal({ start: middle, end: last, tag: html_tag })}
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
