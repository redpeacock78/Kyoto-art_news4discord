/*
Copyright (c) 2020 redpeacock78
This software is released under the MIT License, see LICENSE.
*/

function main() {
  const url = "https://kyotoartnews.page.link/all";
  const result: string[] = rss_perse(url);
  const diff: string[] = diff_result(result)
    .slice()
    .reverse();
  diff.length > 0 && discord(diff);
}
