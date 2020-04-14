# Vuex 

## Vue.use 
**Vue.use** 是vue扩展插件的方法，扩展的插件必须有**install**方法。

## vuex.install 
```javascript
let Vue;
function install (_Vue) {
  if (Vue && _Vue === Vue) {
    {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}
```
install的参数是Vue构造函数，为了避免重复载入vuex插件，在VUEX中预先设置一个变量，当第一次加载时把VUE构造函数赋给它，这样，
当多次加载插件时通过判断是否存在，避免多次加载插件。

## applyMixin
把vuex初始化操作注入到vue的beforeCreate阶段
```javascript
/**
 * vuex v3.1.3
 */
function applyMixin (Vue) {
  const version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    // vuex>2版本
    // vue.minin将beforeCreate发生的函数提前加载到vue构造函数中
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // <2版本太旧 不考虑了
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    ...
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
```

```javascript
Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
```
当执行new Vue(...)生成实例后 就会将vuex 加载到其中。这样每个实例都会获取到。

## 使用vuex

```javascript
const store = new Vuex.Store({
    modules: {
      home: {
        state: {}, 
        getters: {},
        actions: {},
        mutations: {}
      }
    }
  })
```
必须用Vuex.Store方法来加载。

## Vuex.Store
```javascript
class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    // store internal state
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options); //递归调用参数中的modules生成树结构
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._watcherVM = new Vue(); // 生成vue实例对象，执行上面注入到beforeCreated中的vuexInit方法
    this._makeLocalGettersCache = Object.create(null);
  }
}
```


```javascript
// 这样在每个vue实例中就会得到$store对象
 function vuexInit () {
    const options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store; // 这是根节点vue实例上的store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store; //子组件的store会找父组件上的直到根节点store
    }
  }
```
