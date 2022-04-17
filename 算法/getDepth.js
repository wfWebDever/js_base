const o = {
  a: { x: { y: { z: 1 } }, m: 2 },
  b: { o: { p: { q: 3 } } },
  c: 3,
};

const findObjDeep = (obj, deep) => {
  if (deep === 1) return null;
  let curChilds = [obj];
  let tmpChilds = [];
  let i = 2;
  const keys = [];
  while (curChilds.length) {
    const parent = curChilds.shift();
    typeof parent === "object" &&
      Object.keys(parent).forEach((key) => {
        i === deep ? keys.push(key) : null;
        typeof parent[key] === "object" ? tmpChilds.push(parent[key]) : null;
      });
    if (!curChilds.length && i === deep) {
      return keys;
    }
    if (!curChilds.length && tmpChilds.length && deep > i) {
      curChilds = tmpChilds;
      tmpChilds = [];
      i++;
    }
  }
  return keys;
};

const getDepth = (obj, depth) => {
  const res = [];
  const fn = (o, d) => {
    Object.keys(o).forEach((key) => {
      if (d === 1) {
        res.push(key);
      }
      const dep = d - 1;
      dep > 0 && fn(o[key], dep);
    });
  };
  fn(obj, depth);
  return res;
};

// console.log(findObjDeep(o, 5));
console.info(getDepth(o, 3));
