function rss_perse<T extends string>({ URL }: { URL: T }): T[][] {
  const resp: GoogleAppsScript.XML_Service.Document = XmlService.parse(
    UrlFetchApp.fetch(URL).getContentText()
  );
  const xml: GoogleAppsScript.XML_Service.Element[] = resp
    .getRootElement()
    .getChildren("channel")[0]
    .getChildren("item");

  const result: string[][] = [];
  for (let i = 0; i < xml.length; i = (i + 1) | 0) {
    const tit: string = xml[i].getChildText("title");
    const link: string = xml[i].getChildText("link");
    const desc: string = xml[i].getChildText("description");
    result[i] = [tit, link, desc];
  }

  return result as T[][];
}
