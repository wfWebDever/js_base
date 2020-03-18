// 手写实现一个promise

// then:
// then 方法可以被同一个 promise 调用多次
// 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
// 换句话说 onFulfilled 需要等到前面的resolve执行完成后才能进行
// 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

const PENDING = 'pending'
const FULLFILED = 'fullfiled'
const REJECTEd = 'rejected'
const isFunction = (fun) => fun && typeof fun === 'function'
const hanlderCallback = (cb) => {
  const { onFullfiled, onRejected, status, value, resolve } = cb
  if (status === FULLFILED) {
    isFunction(onFullfiled) && resolve(onFullfiled(value))
  }
}
const hanlderCallbacks = (callbacks, status, value) => {
  while (callbacks.length) {
    const cb = callbacks.shift()
    cb.status = status
    cb.value = value
    hanlderCallback(cb)
  }
}

class MyPromise {
  // status = PENDING; // ES7提案，需要babel
  // value = undefined;
  constructor (executor) {
    this.init()
    executor(this.resolve.bind(this), this.reject.bind(this))
  }
  
  init () {
    this.status = PENDING
    this.value = undefined
    this.callbackQueue = []
  }
  
  resolve (value) {
    this.status = FULLFILED
    this.value = value
    // 异步执行
    setTimeout(hanlderCallbacks, 0, this.callbackQueue, this.status, this.value)
  }
  
  reject (error) {
    this.status = REJECTEd
    this.value = error
  }
  
  then (onFullfiled, onRejected) {
    const context = this
    return new MyPromise((resolve, reject) => {
      const { status, value } = this
      const callback = { onFullfiled, onRejected, status, value, resolve }
      if (this.status === PENDING) {
        this.callbackQueue.push(callback)
      } else {
        // 事件机制 实现延迟调用
        setTimeout(hanlderCallback, 0, callback)
      }
    })
  }
}

/*
  * 首先要实现构造函数
  * 构造函数参数为方法，方法的参数分别为resolve reject 2个方法，resolve reject改变promise的值和状态
  * then为核心方法 要返回新的promise对象
* */
/*const promise = new MyPromise(function (resolve, reject) {
  let a = 2
  a++
  console.log('first promise value is', a)
  resolve(a)
})
promise.then((data) => {
  console.log(`first called ${data}`)
  return data + 1
})*/

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('defer promise value is')
    resolve(1)
  }, 3000)
})

/*promise.then((data) => {
  console.log(`more times be called ${data}`)
})*/

promise2.then((data) => {
  setTimeout(console.log, 3000, data)
  return data + 1
})
