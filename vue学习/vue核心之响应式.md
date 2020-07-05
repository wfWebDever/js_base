
# 入口
从哪开始的, 初始化state阶段
```javascript
// 发生在生命周期的 beforeCreate created 之间
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');

function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
}
```

# 创建observer实例对象，并绑定到模版数据的data对象上
- 从源码发现的细节
给数据添加响应式属性 __ob__ 这个属性的值为该observer对象，由于observer对象的value 指向了该数据本身，故是一个循环引用。
但是 由于 def(value, '__ob__', this)的作用 使__ob__为一个不可枚举类型，故这个__ob__在业务代码中不会遍历出来。
```javascript
class Observer {
  constructor (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
```

# get set 
需要用到一个dep实例作为闭包在get收集依赖,在set中派发更新。具体这俩过程在下面介绍。
```javascript
function defineReactive$$1 (obj,key,val,customSetter,shallow) {
  const dep = new Dep();
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
```
