/*
* promise all
* */
const promiseAll = function (arr) {
  // return [data1, data2, data3]
  if (typeof arr !== 'array') {
    throw new ReferenceError(`${arr} must is a array`)
  }
  // 为空时立即返回promise
  if (!arr.length) return Promise.resolve([])
  const promiseArr = arr.map(item => {
    if (item instanceof Promise) {
      return item
    } else {
      return Promise.resolve(item)
    }
  })
  
  const arrData = new Array(promiseArr.length)
  const len = arrData.length
  return new Promise((resolve, reject) => {
    promiseArr.forEach( (item, index) => {
      item.then(data => {
        arrData[index] = data
        if (index === len - 1) {
          return resolve(arrData)
        }
      }).catch(error => {
        return reject(error)
      })
    })
  })
}

promiseAll([1, Promise.resolve(1), new Promise((resolve, reject) => {throw new Error('error to selt catch')}).then().catch(error => error)]).then(data => {
  console.log(`resolve ok: ${data}`)
}).catch(error => {
  console.log(`error: ${error}`)
})
promiseAll([]).then(data => console.log(data))