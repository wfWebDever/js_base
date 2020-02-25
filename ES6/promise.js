// 手写实现一个promise
const PENDING = 'pending'
const FULLFILEd = 'fullfiled'
const REJECTEd = 'rejected'
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
  }

  resolve (value) {
    this.status = FULLFILEd
    this.value = value
  }

  reject (error) {
    this.status = REJECTEd
    this.value = error
  }

  then () { // then需要透传数据
  
  }
}

const promise = new MyPromise(function (resolve, reject) {
  resolve(1)
})
promise.then((data) => {
  console.log(data)
})
