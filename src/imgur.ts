async function imgur<T extends string>({ title }: { title: T }): Promise<T> {
  //スクリプトのプロパティの値(client_id, cloud_name)を取得
  const get_value = ({ property }: { property: string }): string => {
    return PropertiesService.getScriptProperties().getProperty(property);
  };
  const client_id: string = get_value({ property: "client_id" });
  const cloud_name: string = get_value({ property: "cloud_name" });

  //title, client_id, cloud_nameそれぞれを代入
  const id = `Client-ID ${client_id}`;
  const imgur_url = "https://api.imgur.com/3/image";
  const ogp_url = `https://res.cloudinary.com/${cloud_name}/image/upload/l_text:Sawarabi%20Gothic_45:${title},w_800,c_fit/v1581149440/OGP/IMG_0172_qjc2qa.png`;

  //OGP画像を生成し取得
  const resp = async ({
    url
  }: {
    url: string;
  }): Promise<GoogleAppsScript.URL_Fetch.HTTPResponse> => {
    return UrlFetchApp.fetch(url, { method: "get" });
  };
  const resp_blob: GoogleAppsScript.Base.Blob = (
    await resp({ url: ogp_url })
  ).getBlob();

  //取得したOGP画像をヘッダー情報に格納
  const content: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: id
    },
    payload: resp_blob
  };

  //ヘッダー情報をImgur APIにPOSTし返ってきたJSONからImage Linkを取得し返却
  const imgur_resp = async ({
    url,
    header
  }: {
    url: string;
    header: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
  }): Promise<string> => {
    return UrlFetchApp.fetch(url, header).getContentText();
  };

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

  const imgur_json = (await JSON.parse(
    await imgur_resp({ url: imgur_url, header: content })
  )) as ImgurType;
  return imgur_json.data.link as T;
}
