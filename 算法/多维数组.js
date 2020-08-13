/*
*
* 多维数组拍平
* 思路就是递归 但是呢，有个问题是递归这种机器思路有点逆反，反人类的思路 遇到递归的题目是犯杵的 我理解的递归有点类似于深度遍历，
* 递归的返回处理，递归的终点在哪，可以把递归分成小范围来处理
*
* */

//[1, 2, 3,[5, 6, 7, [8, 9]]]
// [1, 2, 3, [4], [5, 6, 7, [8, 9]]]
function arrToOne (arr) {
  let arrOne = []
  arr.forEach(val => {
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

const result = arrToOne([1, 2, 3, [5, 6, 7, [8, 9]]])
console.log(result)