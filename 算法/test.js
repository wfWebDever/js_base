const test = -121

const isPalindrome = function (x) {
  x = x.toString()
  const xArr = x.split('')
  if (xArr.length === 0) {
    return false
  }
  if (xArr.length === 1) {
    return true
  }
  if (xArr.length === 2) {
    return xArr[0] === xArr[1]
  }
  const leftStr = xArr.slice(0, Math.floor(xArr.length / 2)).join('')
  const rightStr = xArr.slice(Math.ceil(xArr.length / 2)).reverse().join('')
  return leftStr === rightStr
}
console.log(isPalindrome(test))
