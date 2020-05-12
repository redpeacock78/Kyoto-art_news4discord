function imgur<T extends string>(title: T): T {
  const client_id: string = PropertiesService.getScriptProperties().getProperty(
    "client_id"
  );
  const cloud_name: string = PropertiesService.getScriptProperties().getProperty(
    "cloud_name"
  );
  const id: string = "Client-ID " + client_id;
  const imgur_url = "https://api.imgur.com/3/image";
  const ogp_url: string =
    "https://res.cloudinary.com/" +
    cloud_name +
    "/image/upload/l_text:Sawarabi%20Gothic_45:" +
    title +
    ",w_800,c_fit/v1581149440/OGP/IMG_0172_qjc2qa.png";

  //OGP画像を生成し取得
  const resp: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(
    ogp_url,
    { method: "get" }
  );
  const resp_blob: GoogleAppsScript.Base.Blob = resp.getBlob();

  //取得したOGP画像をヘッダー情報に格納
  const content: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: id
    },
    payload: resp_blob
  };

  //ヘッダー情報をImgur APIにPOSTし返ってきたJSONからImage Linkを取得し返却
  const imgur_resp: string = UrlFetchApp.fetch(
    imgur_url,
    content
  ).getContentText();

  interface ImgurType {
    data: Data;
    success: boolean;
    status: number;
  }

  interface Data {
    id: string;
    title: null;
    description: null;
    datetime: number;
    type: string;
    animated: boolean;
    width: number;
    height: number;
    size: number;
    views: number;
    bandwidth: number;
    vote: null;
    favorite: boolean;
    nsfw: null;
    section: null;
    account_url: null;
    account_id: number;
    is_ad: boolean;
    in_most_viral: boolean;
    tags: any[];
    ad_type: number;
    ad_url: string;
    in_gallery: boolean;
    deletehash: string;
    name: string;
    link: string;
  }

  const imgur_json = JSON.parse(imgur_resp) as ImgurType;
  return imgur_json.data.link as T;
}
