
"use strict ";
function Oo(){
    this.name="inner";
    this.sex="male";
}
Oo.prototype={
    getName:function () {
        return this.name;
    },
    setName:function (name) {
        this.name = name;
    },
    getSex:function () {
     return this.sex;
    }
};

let o=new Oo();
console.info(
    Oo.__proto__
    //Oo.prototype
);


var ExtendOo=function () {
    Oo.call(this);
    this.sex="female";
};
ExtendOo.prototype=Object.create(Oo.prototype);
//ExtendOo.prototype=new Oo();
console.info(new ExtendOo().getSex());
let a="undefined";
let b="false";
let c="";
function fdfd(val) {
    if(val){
        console.info(true);
    }else {
        console.info(false)
    }
}
fdfd(a);
fdfd(b);
fdfd(c);


