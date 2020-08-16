// add(1)(2).sum() 输出3
// add(1)(2)(3).sum() 输出6
// add(1)返回函数a 并且将1 保存起来
// add(1)(2)执行函数a, 并且还要返回函数a, 还要进行 1 + 2
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

// 实现数组map
console.log([1,2,3].map((item, index, arr) => arr[2] + item))
Array.prototype.map = function (fn, thisArg) {
  const arr = this
  if (arr == null) {
    throw new TypeError(this + 'must not null or undefined')
  }
  if (typeof fn !== 'function') {
    throw new TypeError(fn + 'must a function')
  }
  const result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(fn.call(thisArg, arr[i], i , arr))
  }
  return result
}
console.log([1,2,3].map((item, index, arr) => arr[2] + item))