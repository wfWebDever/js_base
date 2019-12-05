function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
// 手写实现一个promise
class MyPromise {
  constructor(executor) {
    executor();
  }
}

const promise = new MyPromise(function (resolve, reject) {
  let a = 1;
  resolve(1);
});

const promise2 = new  Promise((resolve, reject) => {
  resolve(1);
});
