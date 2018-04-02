let obj={a:[1,2],b:{c:{d:1},e:2}};
let _toString=Object.prototype.toString;
const deepClone=function (obj) {
    let type=_toString.call(obj);
    let obj_return;
    if(type==="[object Object]"){
        obj_return={};
    }else if(type==="[object Array]"){
        obj_return=[];
    }else {
        return obj;
    }
    switch (type){
        case "[object Object]":{

            for(let key in obj){
               obj_return[key]=deepClone(obj[key]);
            }
            break;
        }
        case "[object Array]":{
            obj.forEach(function (item) {
                obj_return.push(deepClone(item))
            });
            break;
        }
        default:{
            //return obj;
        }
    }
    return obj_return;

};

let obj_clone=deepClone(obj);
let obj_shallow=obj;

obj.a=[1,2,3];


console.info("source=",obj,"\n","shallow=",obj_shallow,"\n","clone=",obj_clone);

