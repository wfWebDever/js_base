//  对于匿名函数小括号括起来的含义
/*
 * 小括号返回的是function对象，然后在加上后面跟的参数，
 * 从而立即执行这个函数,实现普通函数的调用形式,
 * alert( typeof  function(x,y){}) ;---function
 * 解析json数据 ,将文本数据加上小括号，使之变成一个对象形式，再eval解析
 * */
// 7.30.2020 总结
// 将函数用括号包裹起来，是作为一个表达式 这样后面执行。
(function f () {})()
// 也可以用void ，void 会让JS引擎将标识符function当作表达式而不是函数声明 这样就会执行函数，返回的是undefined
// void expression
const a = void function f () {
  console.log(this) // window or undefined} ()
  console.log(a) // undefined

// 'use strict'
  var a = 1
  func()
// ;(function () {
//   console.log(this)
//   console.log(a, b)
//   a = 2
//   b = 3
//   console.log(a)
// })()
  function func () {
    'use strict'
    console.log(a)
    // console.log(d)
    var a = 2
    console.log(a)
    d = 4
    console.log(d)
  }