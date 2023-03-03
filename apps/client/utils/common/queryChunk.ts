/*
 str중에 query에 해당하는 값을 기준으로 분리하여
 queryChunk("김동규바보","동규")   [김,동규,바보]
*/
export const queryChunk = (str: string, query: string) => {
  const n = str.toUpperCase();
  const q = query.toUpperCase();
  const x = n.indexOf(q);
  if (!q || x === -1) {
    return str; // bail early
  }
  const l = q.length;

  return [str.substring(0, x), str.substring(x, x + l), str.substring(x + l)];
};
