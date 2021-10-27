
//
const setInterTime = (fn, time = 1000, ...args) => {
  const reducer = (fn, time, ...args) => {
    setInterTime.timer = setTimeout(() => {
      fn(...args)
      reducer(fn, time, ...args)
    }, time)
  }
  reducer(fn, time, ...args)
}
const clearInterTime = (timer) => {
  clearTimeout(timer)
}

setInterTime((msg) => {console.log(msg)}, 1000, 'ok')

// setInterval(() => {
//   console.log(setInterTime.timer)
// }, 1000)

setTimeout(() => {
  clearInterTime(setInterTime.timer)
}, 5000)
