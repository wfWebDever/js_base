// 手写实现一个promise

// then:
// then 方法可以被同一个 promise 调用多次
// 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
// 换句话说 onFulfilled 需要等到前面的resolve执行完成后才能进行
// 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

const PENDING = 'pending'
const FULLFILED = 'fullfiled'
const REJECTED = 'rejected'
const isFunction = (fun) => fun && typeof fun === 'function'
const isObj = (value) => value && typeof value === 'object'
const hanlderCallback = (cb, status, value) => {
  const { onFullfiled, onRejected, resolve, reject } = cb
  if (status === FULLFILED) {
    isFunction(onFullfiled) ? resolve(onFullfiled(value)) : resolve(value)
  }
  if (status === REJECTED) {
    isFunction(onRejected) ? reject(onRejected(value)) : reject(value)
  }
}
const hanlderCallbacks = (callbacks, status, value) => {
  while (callbacks.length) {
    const cb = callbacks.shift()
    hanlderCallback(cb, status, value)
  }
}
// async resolve value
const onFulfiled = function (value) {
  const promise = this
  if (promise.status !== PENDING) return
  promise.status = FULLFILED
  promise.value = value
  setTimeout(hanlderCallbacks, 0, promise.callbackQueue, promise.status, promise.value)
}
// 处理value type
const resolvePromiseValue = function (value, promise, onfulfiled, onRejected) {
  try {
    if (value === promise) {
      let reason = new TypeError('same promise not')
      onRejected(reason)
    }
    if (value instanceof MyPromise) {
      return value.then(onfulfiled, onRejected)
    }
    if (isObj(value)) {
    
    }
    onfulfiled.call(promise, value)
  } catch (e) {
    const reason = new Error('resolve value error')
    onRejected(reason)
  }
}

const onRejected = function (reason, promise) {
  if (promise.status !== PENDING) return
  promise.status = REJECTED
  promise.value = reason
  setTimeout(hanlderCallbacks, 0, promise.callbackQueue, promise.status, promise.value)
}
class MyPromise {
  // status = PENDING; // ES7提案，需要babel
  // value = undefined;
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.callbackQueue = []
    executor(this.resolve.bind(this), this.reject.bind(this))
    return this
  }

  resolve (value) {
    resolvePromiseValue(value, this, onFulfiled, onRejected)
  }
  
  reject (error) {
    onRejected(error, this)
  }
  
  then (onFullfiled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const promise = this
      const { status, value } = promise
      const callback = { onFullfiled, onRejected, resolve, reject }
      if (this.status === PENDING) {
        this.callbackQueue.push(callback)
      } else {
        // 事件机制 实现延迟调用
        setTimeout(hanlderCallback, 0, callback, status, value)
      }
    })
  }
}

/*
  * 首先要实现构造函数
  * 构造函数参数为方法，方法的参数分别为resolve reject 2个方法，resolve reject改变promise的值和状态
  * then为核心方法 要返回新的promise对象
* */
/*
const promise = new MyPromise(function (resolve, reject) {
  const a = 1
  console.log('first promise value is', a)
  resolve(a)
})
promise.then((data) => {
  console.log(`first called ${data}`)
})
*/

/*const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('defer promise value is')
    resolve(2)
  }, 3000)
})


promise2.then((data) => {
  console.log('then value is', data)
  return data + 1
})*/

/*new MyPromise((resolve, reject) => {
  console.log('reject promise is')
  reject('reson')
}).then(() => {}, (reason) => {
  console.log('reject then is', reason)
  return reason
})*/

new MyPromise((resolve, reject) => {
  const promi = new MyPromise((resolve, reject) => {
    resolve(2)
  })
  resolve(promi)
}).then((data) => {
  console.log(data)
})

new Promise((resolve) => {
  resolve(new Promise((resolve) => {
    resolve(2)
  }))
}).then((data) => {
  console.log(data)
})
