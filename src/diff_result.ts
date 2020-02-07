function diff_result(result) {
  const cache = CacheService.getScriptCache().get("result");
  if (cache == null) {
    CacheService.getScriptCache().put("result", JSON.stringify(result), 21600);
  }

  const data = JSON.parse(CacheService.getScriptCache().get("result"));

  const result_tit = [];
  const data_tit = [];
  for (let i = 0; i < result.length; i++) {
    result_tit[i] = result[i][0];
  }
  for (let i = 0; i < data.length; i++) {
    data_tit[i] = data[i][0];
  }

  const tit_diff = result_tit.filter(i => data_tit.indexOf(i) == -1);

  if (tit_diff.length > 0) {
    const diff = [];
    for (let i = 0; i < tit_diff.length; i++) {
      const num = result_tit.indexOf(tit_diff[i]);
      diff[i] = result[num];
    }

    const outcome = diff.concat(data);

    if (outcome.length < 200) {
      CacheService.getScriptCache().remove("result");
      CacheService.getScriptCache().put(
        "result",
        JSON.stringify(outcome),
        21600
      );
      return diff;
    } else {
      CacheService.getScriptCache().remove("result");
      CacheService.getScriptCache().put(
        "result",
        JSON.stringify(outcome.slice(0, 200)),
        21600
      );
      return diff;
    }
  } else {
    CacheService.getScriptCache().remove("result");
    CacheService.getScriptCache().put("result", JSON.stringify(result), 21600);
    return tit_diff;
  }
}
