/*
 *
 * 多维数组拍平
 * 思路就是递归 但是呢，有个问题是递归这种机器思路有点逆反，反人类的思路 遇到递归的题目是犯杵的 我理解的递归有点类似于深度遍历，
 * 递归的返回处理，递归的终点在哪，可以把递归分成小范围来处理
 *
 * */

// [1, 2, 3, [4], [5, 6, 7, [8, 9]]]
function arrToOne(arr) {
  let arrOne = []
  arr.forEach((val) => {
    if (!Array.isArray(val)) {
      arrOne.push(val)
    } else {
      // 遇到数组了，需要重复执行这个函数，返回的结果是一个数组，怎么连接起来呢，通过concat 或者通过ES6 ... 转换参数
      arrOne = arrOne.concat(arrToOne(val))
      // arrOne.push(...arrToOne(val))
    }
  })
  return arrOne
}

// 第二种思路是通过内部函数处理二维数组情况, 不断循环当前传进来的数组，如果遇到非数组， 那么直接推进内部顶部变量
// 如果遇到数组， 那么重复执行内部函数
// 这样理解起来 还方便
const arrToOne2 = (arr) => {
  const arrOne = []
  const fn = (currArray) => {
    currArray.forEach((val) => {
      Array.isArray(val) ? fn(val) : arrOne.push(val)
    })
  }
  fn(arr)
  return arrOne
}
// 上面思路可以用累积器 reduce试一下 初始值就是[]
const arrToOne3 = (arr) => {
  return arr.reduce((arrOne, curr) => {
    return arrOne.concat(Array.isArray(curr) ? arrToOne3(curr) : [curr])
  }, [])
}

// 用generator
function* arr2One4(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    Array.isArray(item) ? yield* arr2One4(item) : yield item
  }
}

// 最后用ES6的 flat方法

const test = [1, 2, 3, [4], [5, 6, 7, [8, 9]]]
console.log(arrToOne([1, 2, 3, [4], [5, 6, 7, [8, 9]]]))
console.log(arrToOne2([1, 2, 3, [4], [5, 6, 7, [8, 9]]]))
console.log(arrToOne3([1, 2, 3, [4], [5, 6, 7, [8, 9]]]))
//console.log([1, 2, 3, [4], [5, 6, 7, [8, 9]]].flat(Infinity))
const generat = arr2One4(test)
let next = generat.next()
while (!next.done) {
  console.log(next.value)
  next = generat.next()
}
