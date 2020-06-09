function diff_result<T>({ result }: { result: T[] }): T[] {
  //Cache Service関連の操作
  const get_cache = ({ name }: { name: string }): string => {
    return CacheService.getScriptCache().get(name);
  };
  const put_cache = ({
    name,
    data,
    time
  }: {
    name: string;
    data: string;
    time: number;
  }): void => {
    CacheService.getScriptCache().put(name, data, time);
  };
  const rm_cache = ({ name }: { name: string }): void => {
    CacheService.getScriptCache().remove(name);
  };

  //resultの有無
  if (get_cache({ name: "result" }) == null) {
    put_cache({ name: "result", data: JSON.stringify(result), time: 21600 });
  }

  const data: T[] = JSON.parse(get_cache({ name: "result" }));

  const result_tit: T[] = [];
  const data_tit: T[] = [];
  for (let i = 0; i < result.length; i = (i + 1) | 0) {
    result_tit[i] = result[i][0];
  }
  for (let i = 0; i < data.length; i = (i + 1) | 0) {
    data_tit[i] = data[i][0];
  }

  const tit_diff: T[] = result_tit.filter(i => data_tit.indexOf(i) == -1);

  if (tit_diff.length > 0) {
    const diff: T[] = [];
    for (let i = 0; i < tit_diff.length; i = (i + 1) | 0) {
      const num: number = result_tit.indexOf(tit_diff[i]);
      diff[i] = result[num];
    }

    const outcome: T[] = diff.concat(data);

    if (outcome.length < 200) {
      rm_cache({ name: "result" });
      put_cache({ name: "result", data: JSON.stringify(outcome), time: 21600 });
      return diff;
    } else {
      rm_cache({ name: "result" });
      put_cache({
        name: "result",
        data: JSON.stringify(outcome.slice(0, 200)),
        time: 21600
      });
      return diff;
    }
  } else {
    rm_cache({ name: "result" });
    put_cache({ name: "result", data: JSON.stringify(result), time: 21600 });
    return tit_diff;
  }
}
