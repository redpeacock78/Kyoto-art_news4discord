function generate_description(URL) {
  //Underscore for GAS: M3i7wmUA_5n0NSEaa6NnNqOBao7QLBR4j
  const _ = Underscore.load();

  const url_resp = UrlFetchApp.fetch(URL)
    .getContentText()
    .split(/\r\n|\r|\n/);
  const start_num = url_resp.indexOf(
    '                              <div class="post-main-block ve">'
  );
  const last_num = url_resp.indexOf(
    '                              <div class="post-sub-block ve">'
  );
  const text_block = _.unescape(
    String(url_resp.slice(start_num, last_num))
      .replace(/,/g, "")
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
  ).replace(/^ +| +$/g, "");
  const comp_text = text_block => {
    if (Array.from(text_block).length > 90) {
      return (
        Array.from(text_block)
          .slice(0, 90)
          .join("") + "..."
      );
    } else {
      return text_block;
    }
  };

  return comp_text(text_block);
}
