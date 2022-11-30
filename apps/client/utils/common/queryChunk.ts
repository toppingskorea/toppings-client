/*
 str중에 query에 해당하는 값을 기준으로 분리하여
 queryChunk("김동규바보","동규")   [김,동규,바보]
*/
const queryChunk = (str: string, query: string) => {
  const n = str.toUpperCase();
  const q = query.toUpperCase();
  const x = n.indexOf(q);
  if (!q || x === -1) {
    return str; // bail early
  }
  const l = q.length;
  return [str.substr(0, x), str.substr(x, l), str.substr(x + l)];
};

export default queryChunk;
