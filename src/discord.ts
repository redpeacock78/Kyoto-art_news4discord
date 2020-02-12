function discord(message) {
  const url = PropertiesService.getScriptProperties().getProperty("WEB_HOOK");

  for (let i = 0; i < message.length; i++) {
    //テキストを生成
    const description = generate_description(message[i][1]);

    //OGP画像生成
    const ogp_url = imgur(encodeURIComponent(String(message[i][0])));

    //json本体
    const json = {
      attachments: [
        {
          fallback: message[i][0],
          color: "#004194",
          title: message[i][0],
          title_link: message[i][1],
          author_name: "京都造形芸術大学 在学生専用サイト",
          author_link: "https://www.kyoto-art.ac.jp/student/",
          author_icon:
            "https://raw.githubusercontent.com/redpeacock78/kyoto-art_news/images/images/logo.jpg",
          text: description,
          mrkdwn_in: ["text"],
          image_url: ogp_url
        }
      ]
    };

    //json本体をJSON形式に変換
    const payload = JSON.stringify(json);

    //変換したJSONをヘッダー情報に格納
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      contentType: "application/json",
      payload: payload
    };

    //Discordのwebhookにヘッダー情報をPOSTした後1秒間sleep(連投対策)
    UrlFetchApp.fetch(url, options);
    Utilities.sleep(1000);
  }
}
