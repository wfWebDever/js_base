// 手写实现一个promise
class MyPromise {
  value = null;
  status = null;
  pedding = 'pedding';
  fullfiled = 'fullfiled';
  rejected = 'rejected';
  
  constructor(executor) {
    executor(this.resolve.bind(this), this.reject);
  }
  resolve(value){
  
  }
}

const promise = new MyPromise(function (resolve, reject) {
  let a = 1;
  resolve(1);
});

const promise2 = new  Promise((resolve, reject) => {
  resolve(1);
});
