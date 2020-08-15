// add(1)(2).sum() 输出3
// add(1)(2)(3).sum() 输出6
const add = function (val) {
  // 1  2
  // 1 2 => fn
  // 3 => fn
  // fn.sum => val
  const fn = function (value) {
    return add(value + val)
  }
  fn.sum = function () {
    return val
  }
  return fn
}
console.log(add(1)(2).sum())