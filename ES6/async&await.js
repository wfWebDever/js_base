
async function runA() {
  return await goA(async () => {
    const map = [{a:1},{a:2},{a:3}].map(async (item) => {
      console.log('map, item a = ', item.a);
      return await setA(item);
    });
    map.forEach(item=>{
      item.then((ret)=> {
        console.log(ret)
      })
    });
    return Promise.all(map);
  });
}
async function goA(cb){
  await cb();
}
async function setA(value) {
  return  new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve(value.a);
    }, 2000);
  });
}

runA().then((ret)=>{
  console.log('then', ret);
});


async function testA() {
  const map = [{a:1},{a:2},{a:3}].map(async (item) => {
    console.log('map, item a = ', item.a);
    return await setA(item);
  });
}

async function testB(cb){
  return await 2;
}
testB().then(ret => {
  console.log('ret', ret);
});
