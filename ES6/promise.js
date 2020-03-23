// 手写实现一个promise

/*
  * 首先要实现构造函数
  * 构造函数参数为方法，方法的参数分别为resolve reject 2个方法，resolve reject改变promise的值和状态
  * then为核心方法 要返回新的promise对象
* */
// then:
// then 方法可以被同一个 promise 调用多次
// 当 promise 成功执行时，所有 onFulfilled 需按照其注册顺序依次回调
// 换句话说 onFulfilled 需要等到前面的resolve执行完成后才能进行
// 当 promise 被拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调

const PENDING = 'pending'
const FULLFILED = 'fullfiled'
const REJECTED = 'rejected'
const isFunction = (fun) => fun && typeof fun === 'function'
const isObj = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObj(obj)) && 'then' in obj
const hanlderCallback = (cb, status, value) => {
  const { onFulfilled, onRejected, resolve, reject } = cb
  try {
    if (status === FULLFILED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(value)) : resolve(value)
    }
    if (status === REJECTED) {
      isFunction(onRejected) ? reject(onRejected(value)) : reject(value)
    }
  } catch (error) {
    reject(error)
  }
}
const hanlderCallbacks = (callbacks, status, value) => {
  while (callbacks.length) {
    const cb = callbacks.shift()
    hanlderCallback(cb, status, value)
  }
}
// 处理value type
const resolvePromiseValue = function (promise, value, onfulfiled, onRejected) {
  try {
    if (value === promise) {
      const reason = new TypeError('same promise not')
      onRejected(reason)
      return
    }
    if (value instanceof MyPromise) {
      value.then(onfulfiled, onRejected)
      return
    }
    if (isThenable(value)) {
      try {
        const then = value.then
        if (isFunction(then)) {
          return new MyPromise(then.bind(value)).then(onfulfiled, onRejected)
        }
      } catch (error) {
        return onRejected(error)
      }
    }
    // 非上面特殊value 直接处理
    onfulfiled(value)
  } catch (e) {
    const reason = new Error('resolve value error')
    onRejected(reason)
  }
}

class MyPromise {
  // status = PENDING; // ES7提案，需要babel
  // value = undefined;
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.callbackQueue = []
    const transition = (promise, status, value) => {
      if (promise.status !== PENDING) return
      promise.status = status
      promise.value = value
      setTimeout(hanlderCallbacks, 0, promise.callbackQueue, promise.status, promise.value)
    }
    const onFulfiled = value => {
      transition(this, FULLFILED, value)
    }
    let flag = false
    const resolve = value => {
      if (flag) {
        return
      }
      flag = true
      resolvePromiseValue(this, value, onFulfiled, onRejected)
    }
    const onRejected = function (reason) {
      transition(this, REJECTED, reason)
    }
    const reject = function (reason) {
      onRejected(reason)
    }
    executor(resolve, reject)
    return this
  }
  
  then (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const promise = this
      const { status, value } = promise
      const callback = { onFulfilled, onRejected, resolve, reject }
      if (this.status === PENDING) {
        this.callbackQueue.push(callback)
      } else {
        // 事件机制 实现延迟调用
        setTimeout(hanlderCallback, 0, callback, status, value)
      }
    })
  }
}


/*const promise = new MyPromise(function (resolve, reject) {
  const a = 1
  console.log('first promise value is', a)
  resolve(a)
})
promise.then((data) => {
  console.log(`first called ${data}`)
  return ++data
}).then(data => {
  console.log('then then value is', data)
})*/

/*const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('defer promise value is')
    resolve(2)
  }, 3000)
})
promise2.then((data) => {
  console.log('then value is', data)
  return data + 1
}).then(data => {
  console.log('then then value is', data)
  return data + 1
})*/


new MyPromise((resolve) => {
  // resolve(new MyPromise(resolve => {
    resolve(1)
  // }))
}).then((data) => {
  return new MyPromise(resolve => {
    console.log('then value is ', data)
    resolve(data + 1)
  })
})

new MyPromise(resolve => {
  resolve(2)
})
