
//数组
let a=new Set([1]);
console.log(a,Object.prototype.toString.call(a),Array.isArray(a));
//Set { 1 } '[object Set]' false
console.info(Array.of(1,2,3));//[ 1, 2, 3 ] [ 1, 2 ]
console.log(Array.from(new Set([1,2])));//[ 1, 2 ]
let b={
    0: 'a',
    1: 'b',
    2: 'c',
    length: 2  //   必须有length
};
console.log(Array.from(b));//[ 'a', 'b' ];
let c=new Map();
c.set(0,1);
c.set('a',4);
c.set({a:1},true);
console.log(c,Array.from(c));
//Map { 0 => 1, 'a' => 4, { a: 1 } => true } [ [ 0, 1 ], [ 'a', 4 ], [ { a: 1 }, true ] ]

let d=new Map();
console.log(d);

if(true){
    var name=1;
    let name2=2;
    const  name3=3;
}
//console.info(name,name2,name3)
a=[];
for(var i=0;i<10;i++){
     a[i]=function () {
         console.info(i);//i
     }
}
//a[9]();
//console.info(a[6].toString())
var tmp;
for(let i=0;i<10;i++){
    //tmp=5;
    let tmp=6;
    a[i]=function () {
        console.info(i);//i
    }
}
//console.info(tmp)

const exd=function (x=2,y=x) {
    //console.info(x+y);
    let ab=5;
    if(true){
        let ab=6;
        console.info(ab)
    }
    console.info(ab)
}
//exd()

//const  x=x;//x is not defined

