const parseIntFn = function (str) {
  // '12a3aa' {} [] null undefined true false
  if (typeof str !== 'string') {
    throw new TypeError(str + 'must a string')
  }
  if (typeof Number(str.indexOf(0)) !== 'number') {
    throw new ReferenceError(str + 'start code  must a number')
  }
  let numb = []
  for (let item of str) {
    const item2Num = Number(item)
    if (Number.isNaN(item2Num)) {
      break
    } else {
      numb.push(item2Num)
    }
  }
  // console.log(Number(numb.join('')))
  return numb.reduce((acc, value, index) => {
    return acc += Number(value) * Math.pow(10, numb.length - index - 1)
  }, 0)
}
console.log(parseIntFn('132ddd'))