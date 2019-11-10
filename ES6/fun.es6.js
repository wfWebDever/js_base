/*const obj={
    id:1,
    getId:function () {
        //var that=this;
        setTimeout(() =>{
            console.info(this.id)
        },1000)
    }
};
const getId=obj.getId;
getId.call(obj);*/

"use strict";

const time = function () {
  this.a = 1;
  this.run = function () {
    console.info("11", this);
    setTimeout(() => {
      console.info("22", this.a);
    }, 1000);
  }
  
  /*this.run=function(){
      console.info("11",this);
      let _this=this;
      setTimeout(function(){
        console.info("22",_this.a);
      },1000)`
  }*/
}
let t = new time();
t.run();



