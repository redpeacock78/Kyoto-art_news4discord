function imgur(title) {
  const client_id = PropertiesService.getScriptProperties().getProperty(
    "client_id"
  );
  const cloud_name = PropertiesService.getScriptProperties().getProperty(
    "cloud_name"
  );
  const id = "Client-ID " + client_id;
  const imgur_url = "https://api.imgur.com/3/image";
  const ogp_url =
    "https://res.cloudinary.com/" +
    cloud_name +
    "/image/upload/l_text:Sawarabi%20Gothic_45:" +
    title +
    ",w_800,c_fit/v1581149440/OGP/IMG_0172_qjc2qa.png";

  const resp = UrlFetchApp.fetch(ogp_url, { method: "get" });
  const resp_blob = resp.getBlob();

  const content: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: id
    },
    payload: resp_blob
  };

  const imgur_resp = UrlFetchApp.fetch(imgur_url, content).getContentText();
  const imgur_json = JSON.parse(imgur_resp);

  return imgur_json.data.link;
}
