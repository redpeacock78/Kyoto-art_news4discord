function rss_perse<T extends string>(URL: T): T[][] | string[][] {
  const resp: GoogleAppsScript.XML_Service.Document = XmlService.parse(
    UrlFetchApp.fetch(URL).getContentText()
  );
  const xml: GoogleAppsScript.XML_Service.Element[] = resp
    .getRootElement()
    .getChildren("channel")[0]
    .getChildren("item");

  const items: GoogleAppsScript.XML_Service.Element[] = xml;
  const length: number = items.length;

  const result: string[][] = [];
  for (let i = 0; i < length; i = (i + 1) | 0) {
    const tit: string = items[i].getChildText("title");
    const link: string = items[i].getChildText("link");
    const desc: string = items[i].getChildText("description");
    result[i] = [tit, link, desc];
  }

  return result;
}
