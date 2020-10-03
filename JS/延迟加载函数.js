

// 实现延迟加载某函数
function addSleep (obj) {
  const promise = function (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time*1000)
    })
  }
  const fn = {}
  fn.sleep = function(time) {
    const foo = obj.foo
    return {
      foo: async function () {
        await promise(time)
        foo.call(obj)
      }
    }
  }
  console.log(fn)
  return fn
}

let o = {
  foo: function() {
    console.log('bar');
  }
}
let mo = addSleep(o);
mo.sleep(5).foo()