export const isClosedValid = function (s) {
  if (typeof s !== 'string') {
    return false
  }
  if (s === '') {
    return true
  }
  if (s.length % 2 !== 0) {
    return false
  }
  const arr = s.split('')
  const stack = [arr[0]]
  const match = {
    '(': ')',
    '[': ']',
    '{': '}'
  }
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === match[stack[stack.length - 1]]) {
      stack.pop()
    } else {
      stack.push(arr[i])
    }
  }

  return stack.length === 0
}
// const data1 = '()'
// const data2 = '()[]{}'
// const data3 = '(]'
// const data4 = '([)]'
// const data5 = '{[]}'

// console.log(
//   isValid(data1),
//   isValid(data2),
//   isValid(data3),
//   isValid(data4),
//   isValid(data5),
//   isValid('(){')
// )
