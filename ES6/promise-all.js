/*
* promise all
* */
const promiseAll = function (arr) {
  if (!Array.isArray(arr)) {
    throw new ReferenceError(`${arr} must is a array`)
  }
  if (!arr.length) return Promise.resolve([])
  const promiseArr = arr.map(item => {
    return item instanceof Promise ? item : Promise.resolve(item)
  })
  
  const result = new Array(promiseArr.length)
  let len = 0
  let hasCatch = false
  return new Promise((resolve, reject) => {
    promiseArr.forEach( (item, index) => {
      item.then(data => {
        result[index] = data
        len++
        if (len === promiseArr.length) {
          resolve(result)
        }
      }).catch(error => {
        !hasCatch && reject(error)
        hasCatch = true
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