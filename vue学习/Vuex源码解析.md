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
## 根据path递归生成模块 
略

## 动态注册
path如果是字符串则要转换为数组，如'module1' => ['module1']
然后把模块注册到路径上
```javascript 1.8
registerModule (path, rawModule, options = {}) {
    if (typeof path === 'string') path = [path];

    {
      assert(Array.isArray(path), `module path must be a string or an Array.`);
      assert(path.length > 0, 'cannot register the root module by using registerModule.');
    }

    this._modules.register(path, rawModule); //注册模块
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);// 安装模块
    // reset store to update getters...
    resetStoreVM(this, this.state);
  }
```
### 对于注册模块
逻辑为：如果path为空数组，那么为根模块，
如果path不为空，那么该数组的最后一个为要注册的模块，前面的为路径。比如['child1', 'child1_1', 'child1_1_1']
```javascript 1.8
...
this._modules.register(path, rawModule);
... 
register (path, rawModule, runtime = true) {
    {
      assertRawModule(path, rawModule);
    }

    const newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      const parent = this.get(path.slice(0, -1));// 除最后一个，则为模块的路径，如果数组为1，则模块路径在根路径下，也就是父模块为root.
      parent.addChild(path[path.length - 1], newModule);
    }

    // register nested modules
    // 递归调用子模块注册
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime);
      });
    }
  }
```
### 安装模块
- state：用vue给root对象添加响应式属性

```javascript
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`);
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];
    store._withCommit(() => {
      {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          );
        }
      }
      Vue.set(parentState, moduleName, module.state); //用vue给root对象添加响应式属性
    });
  }

  const local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key;
    const handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
```