function captureThreeNumbers(str) {
  const reg = /(\d{3})/
  const val = str.match(reg)

  return val === null ? false : val[0]
}

export { captureThreeNumbers }
