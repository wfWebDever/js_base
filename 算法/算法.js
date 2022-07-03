// 快速排序
const quickSort = function (arr) {
  if (Array.isArray(arr) && arr.length <= 1) {
    return arr
  }
  const middleIndex = Math.floor(arr.length / 2)
  const middleVal = arr[middleIndex]
  const left = []
  const center = [middleVal]
  const right = []
  arr.forEach(function (item, index) {
    if (item < middleVal) {
      left.push(item)
    } else if (item > middleVal) {
      right.push(item)
    } else if (index !== middleIndex && middleVal === item) {
      center.push(item)
    }
  })
  return [...quickSort(left), ...center, ...quickSort(right)]
  // return quickSort(left).concat(center, quickSort(right))
}
const sort_arr = [1, 3, 2, 5, 6, 14, 333, 14, 6, 7, 8]
console.log('quick sort = ', quickSort(sort_arr))

// unquiue去重 ES5方式
const unique = function (arr) {
  const obj = {}
  const arrUnique = []
  arr.forEach((item, index, arr) => {
    if (!obj[typeof item + item + '']) {
      obj[typeof item + item + ''] = true
      arrUnique.push(item)
    }
  })
  return arrUnique
}
const arr = [1, '1', 2, 2, '3', 3, 5, 'a', 'a']
console.info(unique(arr))

// ES6方式
const unique_es6 = (arr) => {
  return Array.from(new Set(arr))
}
// console.info(unique_es6(arr))
