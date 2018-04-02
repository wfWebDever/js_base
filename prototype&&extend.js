

//组合模式
function SuperType(){
    this.property=[1,2];
    this.a=1;  
}
SuperType.prototype={
    constructor:SuperType,
    getProperty:function(){
        return this.property;
    } 
}
function SubType(){
    SuperType.call(this);
}
SubType.prototype=new SuperType();
SubType.prototype.constructor=SubType;
var sub=new SubType();
var sub_2=new SubType();
sub.property.push(3);

/*
**
**
ES6 extends
**
*/

class Point { 

 }

class ColorPoint extends Point {
  constructor() {
    super()
  }
}

let cp = new ColorPoint();
console.info(cp)








