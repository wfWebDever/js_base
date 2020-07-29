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
// 原文为：`注 1:原理是这样的，不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都为 0 的话会被判 断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“object”。 `

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
// 2、引擎负责执行宿主环境调取过来的代码，所以事件循环是由宿主环境搭建的。
// 3、setTimeout并不是立马把程序放在事件循环队列中，而是设置了一个定时器，时间到了才把回调放进循环队列中，此时，队列中可能有多个程序了，所以
//    它的程序运行时间，可能在那个时刻，也可能在那个时刻之后。
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