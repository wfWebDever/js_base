
//访问函数内部的局部变量的方法，定义内部函数（实际也是以局部变量），返回该值,然后父函数返回值是内部函数名.
//当函数a的内部函数b被函数a外的一个变量引用的时候，就创建了一个闭包。
//定义在函数内部的函数叫闭包，作用是可以读取函数内部的变量
//同时因为子函数赋值给了全局变量，故包括其父函数一同存在于内存中，不会因为函数执行完了就消失了， 故n一直存在，所以谨慎用闭包和全局变量。
//是否应用了闭包特性，必须确定该段代码有没有 最重要的要素：未销毁的局部变量
function test(data){
    var n=9;
    function testinner(){
        return n;
    }
    return testinner;
}
//or
function test(data){
	var n=8;
	return function(){
	 return n;
	}
}
var result=test();
result();

//如果变量在函数内部没有声明，也就是没加var ,这个变量等于全局变量，相当于先在外部声明了，然后在函数内部赋值。
function test(){
    n=9;
}
alert(n);//弹出9的值
//
//闭包的例子
var name="This Window";
var object={
    name:"object",
    getNameFunc:function(){
        return function(){
            return this.name;
        }
    }
}
var getName=object.getNameFunc()() ;
alert(getName) ;
//  对于匿名函数小括号括起来的含义
/*
* 小括号返回的是function对象，然后在加上后面跟的参数，从而立即执行这个函数,实现普通函数的调用形式,
* alert( typeof  function(x,y){}) ;---function
* 解析json数据 ,将文本数据加上小括号，使之变成一个对象形式，再eval解析
* */
( function(x,y){})(2,3) ;
eval('('+str+')');


