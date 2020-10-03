console.log('Hi')
setTimeout(() => {
  console.log('set time')
}, 5000)
console.log('hi, you')

setTimeout(() => {
  console.log(1)
}, 0)
new Promise((resolve) => {
  console.log(2)
  for (let i = 0; i < 10000; i++) {
    i === 9999 && resolve()
  }
  resolve(i)
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)

// 2 3 5 4 1
