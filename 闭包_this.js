// 访问函数内部的局部变量的方法，定义内部函数（实际也是以局部变量），
// 返回该值,然后父函数返回值是内部函数名.
// 当函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包。
// 定义在函数内部的函数叫闭包，作用是可以读取函数内部的变量
// 同时因为子函数赋值给了全局变量，故包括其父函数一同存在于内存中，
// 不会因为函数执行完了就消失了， 故n一直存在，
// 所以谨慎用闭包和全局变量。
// 是否应用了闭包特性，必须确定该段代码有没有最重要的要素：未销毁的局部变量
// 作用域链: 函数作用域 全局作用域
// call apply 对箭头函数的绑定对象无效

// this 的值取决于函数调用的方式

function test() {
  let n = 8;
  // eslint-disable-next-line no-return-assign
  return () => n += 1;
}

const result1 = test();
const result2 = test();
console.info('1 test,is==', result1(), result1(), result2());
// 箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this
const name_val = 'This Window';
const object = {
  name_val: 'inner window',
  getNameFunc: () => {
    //getNameFunc的作用域也是因为箭头函数的缘故，所以this取上一层作用域的this,而上一层为全局作用域。
    return () => this.name_val; //取作用域的上一层this ，严格模式下 undefined
  },
};
console.log(object.getNameFunc()());
console.log(object.getNameFunc().call(object));
const obj = {
  a: 10,
};

Object.defineProperty(obj, 'b', {
  get: () => {
    console.log(this.a, typeof this.a, this);
    return this.a + 10;
    // 代表全局对象 'Window', 因此 'this.a' 返回 'undefined'
  },
});


// 闭包的变量作用域链
const i = 'window';
function a() {
  // eslint-disable-next-line no-shadow
  const i = 'inner';
  // eslint-disable-next-line func-names
  const b = function () {
    return i;
  };
  return b;
}

console.info(a()());

