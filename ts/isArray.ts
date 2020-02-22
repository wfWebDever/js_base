let isArray_1 = Array.isArray([1]); //IE9+

let isArray_2 = [1] instanceof Array;

let isArray_3 =  Object.prototype.toString.call([1])==='[object Array]';

let arr1 = [{'isArray_1': isArray_1}, {'isArray_2': isArray_2}, {'isArray_3': isArray_3}];

console.table(arr1);

