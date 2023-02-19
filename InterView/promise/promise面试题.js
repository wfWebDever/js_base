console.log(1)
setTimeout(() => {
  console.log(2)
  Promise.resolve().then(() => {
    console.log(3)
  })
  console.log(8)
}, 20)
for (let i = 0; i < 100000000; i++) {} // 执行时间超过20毫秒的话，上面的setTimeout宏任务会到达执行时间
new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data)
})
setTimeout(() => {
  console.log(6)
}, 10)
console.log(7)

// async await错误处理
async function f() {
  try {
    await Promise.reject('出错了')
  } catch (e) {}
  return await Promise.resolve('hello world')
}

f()
  .then((v) => console.log(v))
  .catch((e) => console.log(e))
