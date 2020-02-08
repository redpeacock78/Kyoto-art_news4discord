function discord(message) {
  const url = PropertiesService.getScriptProperties().getProperty("WEB_HOOK");

  for (let i = 0; i < message.length; i++) {
    //jsonに埋め込むテキスト部を作成
    const url_resp = UrlFetchApp.fetch(message[i][1])
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
      .replace(/ +|&nbsp;/g, "")
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
    const text_draft = text_block => {
      if (text_block.length > 80) {
        return text_block.substr(0, 80) + "...";
      } else {
        return text_block;
      }
    };
    const text_comp = text_draft(text_block);

    //OGP画像生成
    const string = String(message[i][0]).replace(/ /g, "%20");
    const ogp_url =
      "https://res.cloudinary.com/dy7i2k9d4/image/upload/l_text:Sawarabi%20Gothic_45:" +
      string +
      ",w_800,c_fit/v1581149440/OGP/IMG_0172_qjc2qa.png";

    //json本体
    const json = {
      attachments: [
        {
          fallback: "Required plain-text summary of the attachment.",
          color: "#004194",
          title: message[i][0],
          title_link: message[i][1],
          author_name: "京都造形芸術大学 在学生専用サイト",
          author_link: "https://www.kyoto-art.ac.jp/",
          author_icon:
            "https://raw.githubusercontent.com/redpeacock78/kyoto-art_news/images/images/logo.jpg",
          image_url: ogp_url,
          text: text_comp,
          mrkdwn_in: ["text"]
        }
      ]
    };

    const payload = JSON.stringify(json);

    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      contentType: "application/json",
      payload: payload
    };

    UrlFetchApp.fetch(url, options);
  }
}
