// 实现数组map
console.log([1, 2, 3].map((item, index, arr) => arr[2] + item))
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
    result.push(fn.call(thisArg, arr[i], i, arr))
  }
  return result
}
console.log([1, 2, 3].map((item, index, arr) => arr[2] + item))
