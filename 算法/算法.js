// 快速排序
const quickSort = function (arr) {
  if (Array.isArray(arr) && arr.length <= 1) {
    return arr;
  }
  const middleVal = arr[Math.floor(arr.length / 2)];
  let left = [];
  let center = [];
  let right = [];
  //ie9+ support  forEach
  arr.forEach(function (item, index) {
    if (item < middleVal) {
      left.push(item);
    } else if (item > middleVal) {
      right.push(item);
    } else {
      center.push(item);
    }
  });
  
  return quickSort(left).concat(center, quickSort(right));
};
let sort_arr = [1, 3, 2, 5, 6, 14, 333, 14, 6, 7, 8]
quickSort(sort_arr);
console.log(sort_arr.sort(function (a, b) {
  return a - b;
}));

//unquiue去重
let unique = function (arr) {
  let arrNew = [], obj = {};
  arr.forEach(function (item, index, arr) {
    if (!obj[item]) {
      obj[item] = true;
    }
  });
  return Object.keys(obj);
};
let arr = [1, '1', 2, 2, "3", 3, 5, 'a', 'a'];
console.info(unique(arr));//[ 1, 2, 3, 5, 'a' ] 数字1和字符串1没有区分

//ES6方式
const unique_es6 = function (arr) {
  return Array.from(new Set(arr));
}
//console.info(unique_es6(arr))








