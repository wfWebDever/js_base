
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
```
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
需要用到一个dep实例作为中间层，在get中通过闭包收集dep依赖,而在set中其收集的依赖进行派发更新。具体这2个过程在下面介绍。
```
function defineReactive$$1 (obj,key,val,customSetter,shallow) {
  const dep = new Dep();
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) { // watcher观察者对象 后面介绍，因为是要收集这个对象 故要先判断是否存在
        dep.depend(); // 收集依赖方法
        if (childOb) {
          childOb.dep.depend(); // 存在对象属性 其属性也得收集，因为可能其也依赖
          if (Array.isArray(value)) { // 数组对象的话 要遍历元素，每个元素都需要递归的收集依赖
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
      dep.notify(); // 派发更新 
    }
  });
}
```

Dep对象的实例保存着每个属性依赖的观察者对象watcher, 依赖收集的过程是在每个属性取值get的时候，具体发生在watcher对象的引用的get方法中逻辑。
然后就到了响应式的 get中
Dep.target 是当前正在执行的观察者对象
dep.depend() 方法具体执行收集过程。
```childOb.dep.depend()```, ```dependArray(value)``` 是对对象和数组的深入收集依赖过程
```
    if (Dep.target) { // watcher观察者对象 后面介绍，因为是要收集这个对象 故要先判断是否存在
        dep.depend(); // 收集依赖方法
        if (childOb) {
          childOb.dep.depend(); // 存在对象属性 其属性也得收集，因为可能其也依赖
          if (Array.isArray(value)) { // 数组对象的话 要遍历元素，每个元素都需要递归的收集依赖
            dependArray(value);
          }
        }
    }
```
dep.depend：是Dep构造函数prototype方法
首先也需要判断是否有当前正在执行的观察者对象，然后有的话，执行其addDep 方法，将当前dep实例作为参数传入
所以收集的具体过程就到了观察者对象上
```
depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
```
addDep方法：观察者对象watcher上引用的方法
```newDepIds``` ```newDeps``` 分别代表新的dep依赖  id的集合、dep集合,如果新的依赖集合中没有这个，则需要加入其中。故观察者对象中保留着其依赖
的所有dep实例
最后一个```if```判断 表明如果老的集合中没有，则需要调用dep对象的addSub方法进行收集，那什么时候 老的集合中会没有呢？比如说第一次收集的时候就都是
空的

```
 /**
   * Add a dependency to this directive.
   */
  addDep (dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }
```
第一次依赖收集结束后，dep对象的subs中就会有一个观察者对象，故dep.subs属性中保留着所有的依赖的观察者对象
```
// Dep方法
addSub (sub) {
    this.subs.push(sub);
  }
```
收集完成后 有一个处理老旧依赖的过程

```
get () {
    pushTarget(this);
    ...
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      ...
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  }
```
cleanupDeps: 交换新旧dep值，最后删除新的集合中的数据
  while循环中意思是指新的集合中某个依赖已经不再需要了，那么需要把dep已经收集的依赖项中删除removeSub，这和上面的addSub对应。
```
 /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }
```