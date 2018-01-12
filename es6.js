
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