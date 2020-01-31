function clone(value) {
  if (Array.isArray(value)) {
    return value.map((value) => {
      return clone(value);
    });
  } else if (typeof value === 'object') {
    const res = {};
    Object.keys(value).forEach(key => {
      res[key] = clone(value[key]);
    });
    return res;
  } else {
    return value;
  }
}

const value = {
  a: [1, 3],
  b: {a: 1, b: 2},
  c: 3,
  d: undefined,
  e: null,
};
console.log(clone(value));
