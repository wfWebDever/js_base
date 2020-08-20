const parseIntFn = function (value) {
  // '12a3aa' {} [] null undefined true false
  if (typeof value === 'number') {
    return value
  }
  if (typeof value !== 'string') {
    throw new TypeError(value + 'must a string')
  }
  const arr = value.split('')
  if (typeof Number(arr[0]) !== 'number') {
    throw new ReferenceError(value + 'start must a number')
  }
  let numb = []
  let findNum = true
  arr.forEach(val => {
    if (findNum) {
      const numVal = Number(val)
      if (findNum && typeof numVal === 'number' && !isNaN(numVal)) {
        numb.push(numVal)
      } else {
        findNum = false
      }
    }
  })
  let val = 0
  numb.forEach((value, index) => {
    val += Number(value) * Math.pow(10, numb.length - index - 1)
  })
  console.log(val)
  
}
parseIntFn('1d32ddd')