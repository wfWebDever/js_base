/*
 * async await复杂用法
 *
 * */
async function runA() {
  return await goA(async () => {
    const values = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const map = []
    for (let i = 0; i < values.length; i++) {
      console.log('map, item a = ', values[i].a)
      map.push(setA(values[i]))
    }
    map.forEach((item) => {
      item.then((ret) => {
        console.log('map each', ret)
      })
    })
    // return map;
    return Promise.all(map)
  })
}
async function goA(cb) {
  await cb()
}
async function setA(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value.a)
    }, 2000)
  })
}

runA().then((ret) => {
  console.log('then', ret)
})
