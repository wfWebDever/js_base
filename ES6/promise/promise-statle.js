const PENDING = 'PENDING'

const RESOLVED = 'fulfilled'

const REJECT = 'rejected'

function _isFunction (val) {
  return typeof val === 'function'
}

function _isThenable (x) {
  return _isFunction(x) || (typeof x === 'object' && x !== null)
}

/**

 * Promise 解决过程

 * 如果是thenable对象, 则触发该对象的then方法

 * 如果是一个值, 则直接调用resolve解析这个值

 * @param {Promise}} promise

 * @param {Object} x

 * @param {Function} resolve

 * @param {Function} reject

 */

function resolvePromise (promise, x, resolve, reject) {
  // 要求每次返回新的promise

  // 如果返回是当前的promise, 则抛出typeError

  if (x === promise) {
    reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false

  // 判断是否thenable对象

  if (_isThenable(x)) {
    try {
      const { then } = x

      if (_isFunction(then)) {
        then.call(
          x,

          val => {
            if (!called) {
              called = true

              // 如果不断的返回thenable

              // 则需要不断地递归

              // 但是实际上不应该不断的返回thenable

              resolvePromise(promise, val, resolve, reject)
            }
          },

          reason => {
            if (!called) {
              called = true

              reject(reason)
            }
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) {
        /* istanbul ignore next */

        return
      }

      called = true

      reject(e)
    }
  } else {
    //  非thenable, 则以该值来执行resolve

    resolve(x)
  }
}

class Promise {
  constructor (fn) {
    // 当前promise状态

    this.status = PENDING

    // RESOLVE回调

    this.onResolveCallback = []

    // REJECT回调

    this.onRejectCallback = []

    // 保存当前promise的值

    this.value = null

    // 判断当前promise是否有then回调

    // 用来判断是否需要抛出unHandledPromiseRejectionWarning

    this.hasThenHandle = false

    this.then = this.then.bind(this)

    this.resolve = this.resolve.bind(this)

    this.reject = this.reject.bind(this)

    if (!_isFunction(fn)) {
      throw new Error(`Promise resolver ${fn} is not a function`)
    }

    try {
      fn(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  /**

   * promise执行函数

   * 将promise状态由PENDING转换为RESOLVED

   * 并且设置终值, 执行回调

   * @param {any} val 终值

   * @memberof Promise

   */

  resolve (val) {
    // 只有当状态为PENDING时候才执行

    // 确保Promise只会被执行一次

    const res = v => {
      // 记录当前的值

      this.value = v

      // 修改状态

      this.status = RESOLVED

      // console.log('cal res',val, this.status);

      // 执行回调

      const { onResolveCallback } = this

      if (onResolveCallback.length) {
        setTimeout(() => {
          onResolveCallback.forEach(each => {
            each()
          })
        }, 0)
      }
    }

    if (this.status === PENDING) {
      let called = false

      // FIXED: 如果val是thenable对象, 则传递自身的resolve和jrect

      if (_isThenable(val) && !called) {
        called = true

        // val.then(this.resolve, this.reject)

        resolvePromise(this, val, res, this.reject)
      } else {
        res(val)
      }
    }
  }

  /**

   * promise拒绝函数

   * 将promise状态由PENDING转换为REJECT

   * 并且设置据因, 执行回调

   * @param {any} e 据因

   * @memberof Promise

   */

  reject (e) {
    // 只有当前状态为PENDING的时候才执行

    // 确保Promise只会被执行一次

    if (this.status === PENDING) {
      // 设置据因

      this.value = e

      // 设置状态为REJECT

      this.status = REJECT

      // 如果reject回调不为空, 则遍历并循环

      const { onRejectCallback } = this

      if (onRejectCallback.length) {
        setTimeout(() => {
          onRejectCallback.forEach(each => {
            each()
          })
        })
      }

      // 延迟判断是否有then处理

      // 否则抛出警告

      // 理应触发unhandledrejection事件

      setTimeout(() => {
        if (!this.hasThenHandle) {
          console.error('UnhandledPromiseRejectionWarning --->', e)
        }
      })
    }
  }

  /**

   * then方法

   * @param {Function} [onFulfilled] 前then的resolve函数, 当promise为RESOLVE时,处理当前结果

   * @param {Function} onRejected 当前then的reject函数, 当promise被REJECT时调用

   * @returns {Promise}

   * @memberof Promise

   */

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val

    onRejected =

      typeof onRejected === 'function'

        ? onRejected

        : err => {
          throw err
        }

    const self = this

    // 如果有then方法调用, 则将hasThenHandle设为true

    // console.log(this);

    this.hasThenHandle = true

    /**

     * 返回一个新的promise, 用于链式调用

     */

    const ret = new Promise(function (resolve, reject) {
      // 用try..catch包裹执行方法

      const tryCatchWrapper = function (fnc) {
        return function () {
          try {
            fnc()
          } catch (e) {
            reject(e)
          }
        }
      }

      // 封装resolve方法回调

      const doResolve = tryCatchWrapper(function () {
        resolvePromise(ret, onFulfilled(self.value), resolve, reject)
      })

      // 封装reject方法回调

      // 如果当前then没有相应的reject回调

      const doReject = tryCatchWrapper(function () {
        resolvePromise(ret, onRejected(self.value), resolve, reject)
      })

      if (self.status === PENDING) {
        // 如果当前promise还未执行完毕, 则设置回调

        self.onResolveCallback.push(doResolve)

        self.onRejectCallback.push(doReject)
      } else if (self.status === RESOLVED) {
        // 如果为RESOLVE, 则异步执行resolve

        setTimeout(doResolve, 0)
      } else {
        // 如果为REJECT, 则异步执行reject

        setTimeout(doReject, 0)
      }
    })

    return ret
  }

  /**

   * 捕获异常

   * 相当于加入一个then方法

   * 只不过这个then方法只有onReject

   * @param {Function} reject

   * @returns {Promise}

   * @memberof Promise

   */

  catch (reject) {
    // 相当于新加入一个then方法

    return this.then(undefined, reject)
  }

  /**

   * 非标准中定义

   * 不关心promise状态, 只管执行操作

   *

   * @param {any} [fnc=() => {}]

   * @returns {Promise}

   * @memberof Promise

   */

  finally (fnc = () => {}) {
    return this.then(
      val => {
        fnc()

        return val
      },

      err => {
        fnc()

        throw err
      }
    )
  }

  /**

   * Promise.resolve

   * 将参数转成Promise对象

   *

   * @static

   * @param {any} val

   * @returns {Promise}

   * @memberof Promise

   */

  static resolve (x) {
    // 如果为Promise实例

    // 则返回该实例

    if (x instanceof Promise) {
      return x
    } else if (_isThenable(x)) {
      // 如果为具有then方法的对象

      // 则转为Promise对象, 并且执行thenable

      return new Promise(function (res, rej) {
        // 执行异步

        setTimeout(function () {
          x.then(res, rej)
        }, 0)
      })
    }

    // 如果val为一个原始值,或者不具有then方法的对象

    // 则返回一个新的Promise对象,状态为resolved

    /**

     * @example

     * Promise.resolve()

     */

    return new Promise(function (res) {
      res(x)
    })
  }

  /**

   * reject方法参数会原封不动的作为据因而变成后续方法的参数

   * 且初始状态为REJECT

   * 不存在判别thenable

   * @static

   * @param {any} reason

   * @returns

   * @memberof Promise

   */

  static reject (reason) {
    /**

     * @example

     * Promise.reject('some error')

     */

    return new Promise(function (res, rej) {
      rej(reason)
    })
  }
}

Promise.PENDING = PENDING

Promise.RESOLVED = RESOLVED

Promise.REJECT = REJECT

module.exports = Promise
