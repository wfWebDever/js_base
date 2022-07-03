// 实现bind 方法，
// 首先需要理解用法：fn.bind(obj, 参数1, 参数2, ...) 返回的是一个新函数，这个函数的执行对象this被绑定到了obj,
// 会把参数预设, 也就是说提前也绑定函数参数的对应位置的值, 也可以说是闭包了
// 构造函数情形下 绑定函数无效，但是参数预设正常
Function.prototype.bind = function (obj, ...preArgs) {
  const fn = this
  // 不能是非函数 否则抛出类型异常
  if (typeof fn !== 'function') {
    throw new TypeError(`bind must be a function `)
  }
  const fnBind = function (...args) {
    // or this instanceOf fnBind
    const context = fn.prototype.isPrototypeOf(this) ? this : obj // this 如果是当前函数的实例
    return fn.apply(context, [...preArgs, ...args])
  }
  fnBind.prototype = Object.create(fn.prototype)
  return fnBind
}
// Test
const test = function (a, b, c) {
  console.log('test this', this, 'args=', arguments, 'a,b,c', a, b, c)
}
const bindTest = test.bind({ a: 1 }, 'args')
bindTest(1, 2, 3)
// test
console.log([] instanceof Array)

const construcFn = function (x, y) {
  this.x = x
  this.y = y
}
construcFn.prototype.toStr = function () {
  console.log(this.x, this.y)
}

// const constrTest = construcFn.bind({}, 0)
// const constrTestobj = new constrTest(1, 2)
// constrTestobj.toStr()

const a = { name: 'a' }
const b = { name: 'b' }
function fun1() {
  console.log(this.name)
}
const fun2 = fun1.bind(a)
const fun3 = fun2.bind(b)
fun3()
fun2.call(b)
