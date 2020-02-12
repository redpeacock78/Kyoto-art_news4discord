function rss_perse(URL) {
  const resp = XmlService.parse(UrlFetchApp.fetch(URL).getContentText());
  const xml = resp
    .getRootElement()
    .getChildren("channel")[0]
    .getChildren("item");

  const items = xml;
  const length = items.length;

  const result = [];
  for (let i = 0; i < length; i++) {
    const tit = items[i].getChildText("title");
    const link = items[i].getChildText("link");
    const desc = items[i].getChildText("description");
    result[i] = [tit, link, desc];
  }

  return result;
}
