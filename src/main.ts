function main() {
  const url = "https://kyotoartnews.page.link/all";
  const result: string[] = rss_perse(url);
  const diff: string[] = diff_result(result).slice().reverse();
  const length: number = diff.length;
  if (length > 0) {
    discord(diff);
  }
}
