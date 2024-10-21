// 行列转数字
export const strToNum = function (str) {
  // get the column
  const col = Array.prototype.filter.call(str, val => isNaN(Number(val)))
  // console.log('', col)
  const len = col.length
  const colNum = col.reduce((acc, val, index) => {
    if (val == null || val === '') return 0
    let aToZNum = (val.charCodeAt(0) % 65) + 1
    aToZNum = typeof aToZNum === 'number' ? aToZNum : 0

    return acc + 26 ** (len - index - 1) * aToZNum
  }, 0)
  console.log(colNum)

  return colNum
}
// strToNum('AZ10')
// strToNum('AAA10')
