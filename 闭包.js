//访问函数内部的局部变量的方法，定义内部函数（实际也是以局部变量），
// 返回该值,然后父函数返回值是内部函数名.
//当函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包。
//定义在函数内部的函数叫闭包，作用是可以读取函数内部的变量
//同时因为子函数赋值给了全局变量，故包括其父函数一同存在于内存中，
// 不会因为函数执行完了就消失了， 故n一直存在，
// 所以谨慎用闭包和全局变量。
//是否应用了闭包特性，必须确定该段代码有没有
// 最重要的要素：未销毁的局部变量


function test() {
    var n = 8;
    return function () {
        return n + 1;
    }
}
var result = test();
console.info("1,is==", result(), result());


//
//闭包的例子
var name = "This Window";
var object = {
    name: "object",
    getNameFunc: function () {
        var that=this;
        return function () {
            return that.name;
        }
    }
};
var getName = object.getNameFunc();
console.info("2,==",getName());

var key=1;
var obj={
    key:2,
    get_key:function () {
        return this.key+1;
    }
};
var fun_get_key=obj.get_key;
console.info("3,is==",fun_get_key(),fun_get_key());

var test_closure=function () {
    'use strict';
    return this;
};
console.info('4,is==',global);
//  对于匿名函数小括号括起来的含义
/*
 * 小括号返回的是function对象，然后在加上后面跟的参数，
 * 从而立即执行这个函数,实现普通函数的调用形式,
 * alert( typeof  function(x,y){}) ;---function
 * 解析json数据 ,将文本数据加上小括号，使之变成一个对象形式，再eval解析
 * */



