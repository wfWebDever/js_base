// 浅拷贝
const obj1 = Object.assign({}, { name1: '1' }, { name2: '2' }, { name3: '3' });
console.log(obj1);

// 深拷贝 但是不能复制函数 和undefined
const o2 = { a: 1, b: { b1: 2 }, c: 'c1' };
const o2Copy = JSON.parse(JSON.stringify(o2));
console.log(o2Copy);
o2.a = 2;
console.log(o2.a, o2Copy.a);

// undefined && fun
const o3 = {
  a: 1, b: { b1: 2 }, c: undefined, d() {},
};
const o3Copy = JSON.parse(JSON.stringify(o3))
console.log(o3Copy);// { a: 1, b: { b1: 2 } }

//深拷贝 es5方式
const deepClone = function (source) {
  const isObj = function (value) {
    return value && typeof value === 'object' && !Array.isArray(value);
  };
  const isArr = function (value) {
    return Array.isArray(value);
  };
  const isFun = function (value) {
    return typeof value === 'function';
  };
  let target = {};
  if (isObj(source)) {
    Object.keys(source).map(key => {
      target[key] = deepClone(source[key]);
    });
  } else if (isArr(source)) {
    target = [];
    source.forEach((arr, index) => {
      target[index] = deepClone(arr);
    });
  } else {
    target = source;
  }
  return target;
};
console.log('深拷贝 es5方式',deepClone({
  a: 1, b: { b1: 2 ,c: {d: [1,2]}}, c: undefined, d: function () {},
}));

