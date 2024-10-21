// 快速排序
export const quickSort = function (arr) {
  if (Array.isArray(arr) && arr.length <= 1) {
    return arr
  }
  const middleIndex = Math.floor(arr.length / 2)
  const middleVal = arr[middleIndex]
  const left = []
  const center = [middleVal]
  const right = []
  arr.forEach((item, index) => {
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
// const sort_arr = [1, 3, 2, 5, 6, 14, 333, 14, 6, 7, 8]
// console.log('quick sort = ', quickSort(sort_arr))

// unquiue去重 ES5方式
export const unique = function (arr) {
  const obj = {}
  const arrUnique = []
  arr.forEach((item, index, arr) => {
    if (!obj[`${typeof item + item}`]) {
      obj[`${typeof item + item}`] = true
      arrUnique.push(item)
    }
  })

  return arrUnique
}

// ES6方式
export const uniqueEs6 = arr => Array.from(new Set(arr))
// console.info(unique_es6(arr))
