const obj=Object.assign({name:'1'},{
	name:'2'
},{name:'3'})
console.info(obj);//3 后来的覆盖上一个的

const obj2={
	a:1,
	b:{
		c:2
	}	
}
const copy=Object.assign({},obj2);
console.info(JSON.stringify(copy));
obj2.a=2;
obj2.b.c=3;
console.info(JSON.stringify(copy));