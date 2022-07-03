/**
 * 查看vue源码无意中发现的方法，发现比我以前写的更简洁
 * @param val
 * @returns {number}
 */
function toNumber(val) {
  let n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 *
 * @param value 以前写的
 * @returns {number}
 */
function toNumberOld(value) {
  let val = parseInt(value, 10)
  val = val === '' ? 0 : val
  val = isNaN(val) ? 0 : val
  return val
}
