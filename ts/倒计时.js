const setTimer = (function () {
  let timer = null
  const clear = function () {
    console.info('clear, timer=', timer)
    clearTimeout(timer)
  }
  return {
    init (fn, times, delay) {
      if (times <= 0) {
        return
      }
      timer = setTimeout(() => {
        fn.call(this, arguments, timer)
        times -= 1
        clear()
        this.init(func, times, delay)
      }, delay)
    }
  }
}())

setTimer.init(func, 5, 1000)

function func (arg, timer) {
  console.info(arg[1], timer)
}
