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

