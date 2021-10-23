(async () => {
  try{
    let pro = await new Promise((res,rej)=>{
      rej('error')
    })
  }catch(e){
    console.log('get the catch:',e);
  }
})()
const a={name:'a'};
const b ={name:'b'};
function fun1(){
  console.log(this.name);
}
const fun2 = fun1.bind(a);
const fun3 = fun2.bind(b)
fun3()
fun2.call(b)