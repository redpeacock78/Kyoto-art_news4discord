function generate_description(URL) {
  const url_resp = UrlFetchApp.fetch(URL)
    .getContentText()
    .split(/\r\n|\r|\n/);
  const start_num = url_resp.indexOf(
    '                              <div class="post-main-block ve">'
  );
  const last_num = url_resp.indexOf(
    '                              <div class="post-sub-block ve">'
  );
  const text_block = String(url_resp.slice(start_num, last_num))
    .replace(/,/g, "")
    .replace(/^ +| +$|&nbsp;/g, "")
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  const comp_text = text_block => {
    if (text_block.length > 80) {
      return text_block.substr(0, 80) + "...";
    } else {
      return text_block;
    }
  };

  return comp_text(text_block);
}
