function containsRepeatingLetter(str) {
  const arr = str.split('')
  let flag = false
  for (const [index, val] of arr.entries()) {
    if (val === arr[index + 1]) {
      flag = true
    }
  }

  return flag
}
// 用正则 引用
function containsRepeatingLetterUseReg(str) {
  const reg = /([a-zA-Z])\1/

  return reg.test(str)
}
export { containsRepeatingLetter, containsRepeatingLetterUseReg }

// console.log(containsRepeatingLetter('rattler'))
