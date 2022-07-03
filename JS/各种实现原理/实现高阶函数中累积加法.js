// add(1)(2).sum() 输出3
// add(1)(2)(3).sum() 输出6
const add = function (val) {
  const fn = function (value) {
    return add(value + val)
  }
  fn.sum = function () {
    return val
  }
  return fn
}
console.log('1:', add(1)(2)(3).sum())

// 变种题目 2
// add2() // => 0
// 实现add2(1)(2)() 输出3
// add2(1)(2)(3)() 输出6
const add2 = (...args) => {
  const value = (args.length && args[0]) || 0
  const fn = (...argsInner) => {
    return argsInner.length ? add2(argsInner[0] + value) : value
  }
  return args.length ? fn : 0
}
console.log('2=', add2(), add2(1)(2)(), add2(1)(2)(3)())

// 变种3
// chain(1).add(2).add(3).valueOf()
const chain = (value) => {
  // 返回一个新对象
  // const obj = {
  //   add(val) {
  //     return chain(val+value)
  //   },
  //   valueOf () {
  //     return value
  //   }
  // }
  // 直接在函数上添加新方法 因为函数也是对象的一种
  chain.add = (val) => {
    return chain(val + value)
  }
  chain.valueOf = () => {
    return value
  }
  return chain
}
// test
console.log(chain(1).add(2).add(5).valueOf())
