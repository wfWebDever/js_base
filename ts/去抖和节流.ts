function debounce(method, delay, immediate) {
  let timer
  return function () {
    let context = this,
      args = arguments
    let later = function () {
      timer = null
      if (!immediate) {
        method.apply(context, args)
      }
    }
    if (immediate && !timer) {
      method.apply(context, args)
    }
    console.info(timer)
    clearTimeout(timer)
    timer = setTimeout(later, delay)
    console.info(timer)
  }
}

debounce(calcPrice, 5000, false)
//疑问?如果改成这种 打印timer的时候 发现clearTimeout 不是上一次的,而是空,其实是因为没有把以前的setInterval清除造成的，
//运行这个函数返回的是一个函数 不会执行里面的代码的
let my_keyup_fun = function () {
  debounce(calcPrice, 5000, false)
}
//<input type="text" ng-keyup="my_keyup_fun()" ng-model="spaceSlide.value" maxlength="4" ng-maxlength="4" class="my-ipt my-ipt-md" />
