// 1、函数词法作用域 是在函数定义时的作用域，一直向上找到全局作用域，不是运行时作用域， 以下例子正好说明这个结果
// function foo() {
//   console.log( a ); // 2 // 不是3
// }
// function bar() {
//   let a = 3;
//   foo();
// }
// var a = 2;
// bar();

// 2、this 既不指向函数自身也不指向函数的词法作用域。
// this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

/*第3天*/
// 3、typeof null === 'object' 在计算机底层，对象都是二进制形式，JS对前三位都是0的判定为对象，而null 都是0。
// 这样就好理解了 起码有个底层道理，不然凭空认为是这样，觉得太儿戏。
// 这是一个JS bug, 但是无法修复了，因为很多系统项目在用。
// null 是关键字，不可以被覆盖。
// 原文为：`注 1:原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。 `

// Undefined: 不是关键字 ，可以被覆盖，而使用void(0) 可以很安全的使用undefined值

// 4、基本类型的变量 调用的方法，本质是引擎自动将字面量形式的转换为对象，然后在调用其原型上的方法。
// let str = 'i am is string'; str.slice(0);
// 实际转换成String对象 ，这样就能理解了 为什么能调用这些方法，good

/*第4天*/
// 1、对象：数组也是一种对象,可以添加属性，但是因为不符合下标规范，所以数组的length没有变化，所以下面第4个值不存在
// 进一步讲，要是添加的属性为数字型的字符串呢，那当然可以被JS引擎转化成下标形式
// let arr = [1, 2, 3]; arr.len = 4; arr['3'] = 4
// console.log(arr, arr.length)  // [ 1, 2, 3, len: 3 ], 3
// 2、遍历对象的几种方法
// Object.keys() //会遍历对象本身上的所有属性成一个数组集合,不包括设置为不能枚举的属性
// Object.getOwnPropertyNames  //会遍历对象本身上的所有属性成一个数组集合,但包括设置为不能枚举的属性
// for in 会遍历对象自身及其原型链上的属性
// myObject.hasOwnProperty() 只针对某个属性是否是在对象本身上，所以需要和for in配合
// const myObject = {
//   a: 1,
//   b: 2,
// };
// Object.defineProperty(myObject, 'c', {
//   enumerable:false,
//   value: 3
// })
// Object.getOwnPropertyNames(myObject); // ['a', 'b', 'c']

/*第5天*/
// 事件循环：
// 1、宿主环境和引擎关系，如同浏览器和V8关系。
// 2、在ES6之前引擎负责执行宿主环境调取过来的代码，所以事件循环是由宿主环境搭建的。而ES6之后，引擎负责制定事件循环，因为有了Promise
// 3、setTimeout并不是立马把程序放在事件循环队列中，而是设置了一个定时器，时间到了才把回调放进循环队列中，此时，队列中可能有多个程序了，所以
//    它的程序运行时间，可能在那个时刻，也可能在那个时刻之后。
// Promise发生在一次轮询tick的末尾，和下一轮轮询Tick之前。
// 程序的完整性运行：是指函数内部的代码都是同步代码，而在函数这个级别上它的顺序是多种可能的。非完整性程序内部有异步程序，比如ajax promise setTimeout等

/*第6天*/
// 为什么用promise
// 首先为什么摒弃回调，因为顺序的同步流代码对人们的大脑来说是可接受的，而回调的存在会打乱这些步骤，造成一些列不可理解、不可维护、糟糕的代码。
// 异步流代码不单单存在回调地狱（嵌套）的问题，还有一个最重要的问题就是上面说的代码的不好维护，太糟糕。比如下面的代码
// listen( "click", handler );
// function handler() {
//   setTimeout( request, 500 );
// }
// function request(){
//   ajax( "http://some.url.1", response );
// }
// function response(text){ if (text == "hello") {
//   handler(); }
//   else if (text == "world") { request();
// } }
// 我们的眼睛需要不断的来回上下翻看程序执行顺序，对于程序员来说 这是一种最大的心智负担了吧。

// promise 不是对回调的替代，其实是对回调代码和将来执行这个任务的异步代码之间提供了一种可靠的中间机制来管理回调。
// promise可以优雅的处理 回调地狱的劣势。
// Promise 决议后就是外部不可变的值，这是 Promise 设计中最基础和 最重要的因素，这是关于 Promise 需要理解的最强大也最重要的一个概念。

/*第7天*/
// JS的继承 不是面向对象的那种继承，也不是对象的复制，就是基于原型。
// 相对于继承，用委托更为确切，一个对象通过一种链接到另一个对象，然后可以取到另一个对象的属性和方法。
// 原文：继承意味着复制操作，JavaScript(默认)并不会复制对象属性。相反，JavaScript 会在两 个对象之间创建一个关联，这样一个对象就可以通过委托访问另一个对象的属性和函数。
// 委托(参见第 6 章)这个术语可以更加准确地描述 JavaScript 中对象的关联机制
/*第8天*/
//JS继承的理解
// JS根本不是所谓的继承机制，因为继承是需要复制父辈的属性和方法的，而JS是通过原型链获取属性和方法，没有复制。
// 通过'构造函数'举例来说
function fun () {
  console.log('fun')
}

fun.prototype = {}
const a = new fun()
console.log(a.constructor) // ？
// 原来的固有印象是通过构造函数fun new出来的对象a 会有一个属性指向其构造函数fun,其实错了，a根本没有属性指向fun,
// a.constructor是通过原型链去找,如果在fun.prototype找到了就是fun.prototype的指向，如果没找到，那么继续往上找，
// 一直找到Object.prototype ，而它的constructor =》Object函数,故上面的结果为
console.log(a.constructor) // function Object //注意这里的Object 为函数
// 继续，故需要在其原型上加这个constructor属性指向fun函数， 并且是不可枚举的，那就用到了属性描述
Object.defineProperty(fun.prototype, 'constructor', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: fun
})
console.log(a.constructor) // function fun
// 再往下深入的话，那其实这个constructor有什么作用呢，既然我可以随便定义这个属性。
// 以上可以深刻理解了 JS的所谓继承，根本不存在，本质还是原型，或者链条更为确切。
// 和其他语言的面向对象不是一回事。
// 可以这样形容上述的函数构造对象的过程，本质是创建一个对象a，然后其原型是fun.prototype

/*第9天*/
// vue源码中用到了Object.create(null) 创建空的对象，去掉了原型链（本质是原型关联指向了null）储存一些数据。
// Object.create ES5兼容写法
if (!Object.create) {
  Object.create = function (o) {
    const f = function () {}
    f.prototype = o
    return new f()
    // or
    // const obj = {}
    // obj.__proto__ = o //IE不支持 哈哈 只是表达一种思路
    // return obj
  }
}
// 这个兼容性（polyfill）写法，再次说明了委托原型链的本质，创建一个对象，这个对象的原型指向了要关联的对象。
// 怎么创建一个对象 可以通过一个new 一个函数：
/* 官方解释
* 使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建(或者说构造)一个全新的对象。
2. 这个新对象会被执行[[原型]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
* */

/*第10天*/
//通过两个对象之间建立委托联系的形式，更好的实现了关注点分离。举例
// 首先是类的形式，'子类'需要call 一下'父类'，获取父的属性，然后通过创建一个新对象指向父函数的原型并赋到子类prototype上实现原型的关联
function fa (name) {
  this.name = name
}

fa.prototype.getName = function () {
  return this.name
}

function fb (name, age) {
  fa.call(this, name)
  this.age = age
}

fb.prototype = Object.create(fa.prototype)
const f = new fb('li', 100)
console.log(f.getName())
// 这种方式一点都不分离化，也很费解。
// 以下是对象形式的委托关联
const obj1 = {
  getName () {
    return this.name
  }
}
const obj2 = {
  name: 'li',
  getAge () {
    return this.age
  }
}
Object.setPrototypeOf(obj2, obj1)
console.log(obj2.getName())
// 这种方式 很容易发现 两者之间并不存在很紧密的关系，通过原型链进行关联。
// 联想到日常开发中， 写组件或者写业务，尽量做到分离、低耦合。

//ES6中 class 中原型的探究
// es6  class 说到底是隐藏了一些细节关系，不用通过显示的prototype来关联两个对象， 总结其实就是一种语法糖.
class Widget {
  constructor (width, height) {
    this.width = width || 50
    this.height = height || 50
    this.$elem = null
  }
  
  render ($where) {
    if (this.$elem) {
      this.$elem.css({ width: this.width, height: this.height }).appendTo($where)
    }
  }
}

class Button extends Widget {
  constructor (width, height, label) {
    super(width, height) // 类似执行了 Widget.call(this, width, height)
    this.label = label || 'Default'
    this.$elem = 'button'
  }
  
  render ($where) {
    super.render($where) // 往上找原型widget中的render方法 也是一种委托关联关系，本质不变
    this.$elem.click(this.onClick.bind(this))
  }
  
  onClick (evt) {
    console.log('Button \'' + this.label + '\' clicked!')
  }
}

const btn = new Button(20, 30, null)
console.log(btn)
// 总结

/*第十一、十二天*/
// 类型：
// typeof Array === 'function'  //true
// typeof Symbol() === 'symbol' // true
// 检测null 方法
// const nullVal = null
// !nullVal && typeof nullVal === 'object'
// JS弱类型的含义是指 变量永远不会强制其值的类型和初始值的类型一致，也就是说变量的值可以改变类型。

// 数组
// 数组也是对象的一种，也可以添加属性，通常是不会改变数组的个数的，但是添加的属性如果是字符串形式的数字类型的值，那么就会被强制转换成索引。
// const arr = []; arr['13'] = 'name'; console.log(arr.length) // 14 这是一个坑
// 类数组的改装成真正数组 用Array.prototype.slice.call(arguments) 原理就是使用数组原型中的方法通过call绑定对象实现

// 字符串
// 字符串类似与一个字符数组，可以借用数组的方法
// 字符串由于是不可修改的，全部方法其实是生成新字符串， 而数组的方法是直接修改其本身的，比如reverse push等，这些就不能用在字符串上。
const str = 'abcd'
// let reverseStr = Array.prototype.reverse.call(str) // Cannot assign to read only property '0' of object '[object String]'
// 上面借用reverse 行不通 因为reverse会直接修改对象本身，而字符串是不能被修改的。
let reverseStr = Array.prototype.join.call(str, '-') // a-b-c-d
reverseStr = Array.prototype.map.call(str, s => {
  return s
}).join('-') // a-b-c-d
console.log(reverseStr)
// 借用join 或者借用map先转换成数组
// 如果你经常把你的字符串当作字符数组来使用，那你最好直接把它存入数组而不是字符串中。这样你就没必要每次都将字符串转换为数组。当你真正需要字符串表示时，你可以调用数组的join("")方法。

// 数字
// 0.1 + 0.2 === 0.3 // false  5.1+5.2 === 5.3 // false 由于二进制浮点数对于0.1 0.2实现都不是真正的这个值，故相加结果不是0.3
// 原文：使用二进制浮点数最著名的副作用（请记住，是所有使用IEEE 754的语言——不仅是JavaScript）
// 故前端在涉及这种计算的时候 要特别小心.
// 规避措施有 使用一个微小的误差值Number.EPSILON 其实就是2^-52值(Math.pow(2,-52))
const num1 = 0.3
const num2 = 0.1 + 0.2
console.log(Math.abs(num1 - num2) < Number.EPSILON) // true  // Math.abs取一下绝对值
// 整数的范围为下面两个
// Number.MAX_SAFE_INTEGER; // Math.pow( 2, 53 ) - 1
// Number.MIN_SAFE_INTEGER  //
// 测试是不是安全整数的方法
Number.isSafeInteger(Math.pow(2, 53))
// isNaN 是唯一一个不等于其自身的值, 检测方法有ES6的Number.isNaN() 和ES5的window.isNaN() //后者会把非数字类型的也检测成true

// JS 引用类型赋值或传递
// 引用类型作为参数时，其引用会被复制到一个新的变量，这个变量和原先变量其实是引用的同一个值。
// JS没有引用之间传递的过程， 比如 b引用a a引用 {}, 实质的是 b 和a 通过复制了引用，可以指向同一个值{}
// 要想修改值的内容，那么必须通过当前的引用的值修改，也就是说不能通过再改变当前引用指向的值进行修改。
// const a = {a: 1}; let b = a; b.a = 2 // 可以更改a对象
// b = {a: 2} // 这样不行， 因为b指向了一个新的值
// 原文：JS中的引用并不像其他语言中的引用或指针——它们永远不指向其他变量或引用，仅指向底层的值
// JS中引用指向一个（共享的）值，所以如果你有10个不同的引用，它们始终是一个共享值的不同引用；它们都不引用/指向对方。

/*第13天*/
// 今天把类型一章看完了，发现没啥收获。
// 类型转换
// 当JSON.stringify(..)遇到undefined、function和symbol的时候，会自动忽略它们的值。如果这样的值在数组中，
// 这个值会被替换成null（这样数组的位置信息就不被改变）。如果这样的值出现在对象的属性中，那这个属性会被排除掉。
// JSON.stringify(..) 第3个参数可以打印漂亮的对象结构，这在日常开发显示某个对象值时很有用。而第二个参数是过滤数组或者函数。
// NaN 也会被转换成假值 false
// 假值对象
const a1 = new Boolean(false)
const b = new String('')
const c = new Number(0)
console.log(a1 && b && c) //Number0 // 也都是true

/*第14天*/
// 类型转换 a == b
//console.log(0 == [null]) // true // [null]会先通过toString()转换成字符串'' ，然后数字和字符串相比， 会将字符串''转换成数字 0
// null == undefined 除了这俩 其他任何和他俩比较都是false
// 只要有布尔值 都会首先转换成数字
// 如果两边的值中有 true 或者 false，千万不要使用 ==。
// 如果两边的值中有 []、"" 或者 0，尽量不要使用 ==。

/*第15天*/
// 语句 操作符优先级
// 今天似乎没发现什么新的东西,因为日常开发中用的比较多
// 语句：学到了 语句包括表达式和 赋值语句的含义。
// 操作符优先级 只有这两种情况下是右分组
// true ? false : true ? true : false;
// var a, b, c; a = b = c = 42;
// 暂时性死区 TDZ
// {
//   a = 2;      // ReferenceError!
//   let a;
// }
// try finally: finally中语句总是会执行，即便try中有return, 但是会让代码变得有些难懂。最好不要这样
// const tryFinally = function () {
//   try {
//     return 1
//   } finally {
//     console.log(111)
//   }
// }
// console.log(tryFinally())
// 总结：语法、操作符、TDZ、容错等就是日常开发中的细节，这要在平日里注意积累，不要用那些难懂的语句编程。

// ECMAScript 是规范，而JS是在浏览器上的实现

/*第16天*/
// Benchmark.js 库 测试代码的性能，抛弃以前设置开始事件、结束事件的劣质做法。
// jsPerf(http://jsperf.com) 在线测试
// 尾调用优化TCO，函数内部最后执行的函数，引擎会优化内存空间

/*第17天*/
// yield
// 划重点：yield 会导致生成器在执行过程中发送出一个值，这有点类似于中间的 return
//

/*第18天*/
// 使用generator的原因是为了用同步的书写方式实现异步，故需要把异步 promise的一些实现细节隐藏起来，作为一个函数，而不必都放在当前函数中
// 下面的代码就是把promise.all封装起来，这俩并发请求作为一个函数，在实际开发过程中很有用，让代码看起来更好维护
// 注:普通函数，不是生成器
// function bar(url1,url2) {
//   return Promise.all( [request( url1 ), request( url2 )] );
// }
// function *foo() {
// // 隐藏bar(..)内部基于Promise的并发细节
//  const results = yield bar("http://some.url.1", "http://some.url.2" )
//  const r1 = results[0];
//  const r2 = results[1];
//  const r3 = yield request( "http://some.url.3/?v=" + r1 + "," + r2);
//  console.log( r3 );
// }
// 使用前面定义的工具run(..) run( foo );
// 在 *foo() 内部，我们所做的一切就是要求 bar(..) 给我们一些 results，并通过 yield 来等待结果，这样更简洁也更清晰。
// 我们不需要关心在底层是用Promise.all([ .. ]) Promise 组合来实现这一切。