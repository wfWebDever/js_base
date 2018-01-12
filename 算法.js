//快速排序
let quickSort=function (arr) {

    if(Array.isArray(arr) && arr.length<=1){
        return arr;
    }

    let middleVal=arr[Math.floor(arr.length/2)];
    let left=[],
        center=[],
        right=[];
    //ie9+ support  forEach
    arr.forEach(function (item,index) {
        if(item<middleVal){
            left.push(item);
        }else if(item>middleVal){
            right.push(item);
        }else {
            center.push(item);
        }
    });
    //console.log(middleVal);
    console.log(left.concat(center,right));
    return quickSort(left).concat(center,quickSort(right));
};

quickSort([1,3,2,5,6,14,333,14,6,7,8]);
console.log([1,3,2,5,6,14,333,14,6,7,8].sort(function (a,b) {
    return a-b;
}));

//unquiue去重
let unique=function (arr) {
    let arrNew=[],
        obj={};
    arr.forEach(function (item,index,arr) {
        if(!obj[item]){
            arrNew.push(item);
            obj[item]=true;
        }
    });
    return arrNew;
};
console.log(unique([1,'1',2,3,5,'a','a']));//[ 1, 2, 3, 5, 'a' ] 数字1和字符串1没有区分

//ES6方式
const unique_es6=function (arr) {
    return Array.from(new Set(arr));
}
console.log(unique([1,'1',2,3,5,'a','a']))

//console.info(typeof null,typeof  undefined,null==undefined)






