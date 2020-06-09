/*
Copyright (c) 2020 redpeacock78
This software is released under the MIT License, see LICENSE.
*/

function main(): void {
  const url = "https://kyotoartnews.page.link/all";
  const result = rss_perse<string>({ URL: url });
  const diff = diff_result<string[]>({ result: result })
    .slice()
    .reverse();
  diff.length > 0 && discord<string[]>({ message: diff });
}
