function generate_description(URL) {
  const character_name = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&yen;": "¥",
    "&copy;": "©",
    "&brvbar;": "¦",
    "&reg;": "®",
    "&beg;": "°",
    "&plusmn;": "±",
    "&times;": "×",
    "&divide;": "÷",
    "&acute;": "´",
    "&micro;": "µ",
    "&middot;": "·"
  };
  const character_num = {
    "&#038;": "&",
    "&#034;": '"',
    "&#165;": "¥",
    "&#169;": "©",
    "&#166;": "¦",
    "&#174;": "®",
    "&#176;": "°",
    "&#177;": "±",
    "&215;": "×",
    "&247;": "÷",
    "&#180;": "´",
    "&#181;": "µ",
    "&#183;": "·"
  };

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
    .replace(/^ +| +$|^&#032|&#032$|&nbsp;|&#160;|&#010;|&#009;|&#013/g, "")
    .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "")
    .replace(
      /&(lt|gt|amp|quot|yen|copy|brvbar|reg|beg|plusmn|times|divide|acute|micro|middot);/g,
      c => character_name[c]
    )
    .replace(
      /&#(034|038|165|166|169|174|176|177|215|247|180|181|183);/g,
      c => character_num[c]
    );
  const comp_text = text_block => {
    if (text_block.length > 95) {
      return text_block.substr(0, 95) + "...";
    } else {
      return text_block;
    }
  };

  return comp_text(text_block);
}
