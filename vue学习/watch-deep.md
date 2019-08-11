# watch

- 生成周期在beforeCreated 和created之间。
    
- 深度监控之数组
1. 
- 深度监控之对象
1. 默认是不会监控对象内部属性的变化。因为考虑到性能问题。
data: {
    watchObj: {a: 1, b: 2, c: {d: 3}},
},
watch: {
    watchObj: 'watchDeep',
},
methods: {
    watchDeep(val) {
      console.log(val);
    },
}

2. 如果要开启的话，需要加上deep: true,以及把回调放在hander中。
data: {
    //watchArr: [],
    watchObj: {a: 1, b: 2, c: {d: 3}},
},
watch: {
    //watchArr: 'watchDeep',
    watchObj: 'watchDeep',
    watchObj: {
      handler: 'watchDeep',
      deep: true,
    }
},
methods: {
    watchDeep(val) {
      console.log(val);
    },
}
- 以下是源码
 function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
}

 如果是对象形式，则解析回调函数为hander属性，如果是字符串
 则获取到metheds中的函数。
 Watcher.prototype.get = function get () {
     pushTarget(this);
     var value;
     var vm = this.vm;
     try {
       value = this.getter.call(vm, vm);
     } catch (e) {
       if (this.user) {
         handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
       } else {
         throw e
       }
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
};
在finally中如果是深度监听，则通过traverse方法递归地深层收集，触发每个属性的get方法，
故很影响性能
if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
}
