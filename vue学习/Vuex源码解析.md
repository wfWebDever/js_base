# Vuex 

## Vue.use 
**Vue.use** 是vue扩展插件的方法，
扩展的插件必须有**install**方法(或者其本身是一个方法)。

## vuex.install 
```javascript
Vue.use = function (plugin) {
  // 在Vue构造函数上的_installedPlugins属性是否包含vuex插件来判断是否重复安装
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 将除了插件本身外的参数构造到新数组中 作为vuex的参数
    const args = toArray(arguments, 1);
    // 这里用到了数组中不常用的添加数据到头部的方法，
    // 把vue构造函数添加到参数中 
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
```

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
- 把vuex初始化操作注入到vue的beforeCreate阶段
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
// Vue mixin方法 把传入的参数合并到Vue参数中,随着实例生成而生成
```javascript
Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
```
当执行new Vue(...)生成实例后 就会将vuex 加载到其中。这样每个实例都会获取到。

## 使用vuex 必须用Vuex.Store方法传入对象
- 对象有modules分模块
- 每个模块有state getters actions mutations

```
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
    this._modulesNamespaceMap = Object.create(null); // 存储命名空间，方便后期直接取
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
- path如果是字符串则要转换为数组，如'module1' => ['module1']
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
    resetStoreVM(this, this.state); // 重置模块
  }
```
### 注册模块
- 总体逻辑：把传入的参数先转换成module，获取父模块，然后作为子模块插入到父模块中。
- 获取父模块逻辑有点绕：如果path为空数组，那么为根模块。
  除最后一个，则为模块的路径，如果数组为1，则模块路径在根路径下，也就是父模块为root
如果path不为空，那么该数组的最后一个为要注册的模块，前面的为路径。比如['child1', 'child1_1', 'child1_1_1']
- 通过 ```this._modules.register``` 方法注册
- 优秀代码：```path.slice(0, -1)``` 以前获取数组的前几个都是 
```const arr = []; arr.slice(0, arr.length - 1)```
倒数第一个为-1 倒数第二个为 -2 ，这样写很直观。

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
      const parent = this.get(path.slice(0, -1)); // 取路径的从0到倒数第二个作为新数组来获取父模块
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
- state：用 ```Vue.set``` 给模块的父模块的state对象添加该模块的state响应式属性。

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
      Vue.set(parentState, moduleName, module.state); // 这是重点 用到了Vue的 set方法
    });
  }
// 构造执行环境
// 这部分暂时放过 过后再理解。
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

## vuex中的state获取API
```javascript
// 使用方法 
// 找到模块然后直接获取state属性，而不是像dispatch commit 那样通过命名空间的方式
this.$store.home.a
// this.$store 代表root state
```
- 安装模块的逻辑中 有一处
```Vue.set(parentState, moduleName, module.state);```
- 找到父的state对象，然后用vue.set把该模块的state添加响应式属性

```
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);
...
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
      Vue.set(parentState, moduleName, module.state);
    });
  }
```

## getters API
- 使用方法 ```this.$store.getters['home/getterHome']```
- ```resetStoreVM ```重置
- 直接是通过getters根上获取该getter对应的key值, 这个key值是命名空间路径,代表的是唯一key
- 使用了 Object.defineProperty 对 store.getters对象上生成以模块key,它的取值get方法是返回的store._vm[key]
-  store._vm 属性保存当前的vue实例，具体作用是data里面保存着state，computed存着getters，可以缓存。
  故上面的取值getter获取的直接是缓存后的getter值
- store._wrappedGetters 保存着当前的getters，是在installModule阶段生成

```javascript
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  const wrappedGetters = store._wrappedGetters; // 注册的时候生成的
  const computed = {};
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({// 用Vue实例对象来构造state和 getters 
    data: {
      $$state: state
    },
    computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(() => oldVm.$destroy());
  }
}
```

### installModule 生成的getters
- 故getters中定义的每个属性的执行方法的参数包括4个方面.


```
getters: {
  getA(state, getters, rootState, rootGetters) {
    .....
  }
}
```
- 源码在此

```javascript
function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error(`[vuex] duplicate getter key: ${type}`);
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state 当前模块
      local.getters, // local getters 当前模块
      store.state, // root state 根模块
      store.getters // root getters 根模块
    )
  };
}
```

## mutations 原理及改变状态唯一操作的原因
- 使用方法, 参数中有当前模块的state 以及传入的参数

```javascript
mutations: {
  changeHomeVal(state, playload) {
    state.home = playload
  }
}
```
- 在```installModule```阶段 注册

```javascript
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload); // 传入当前模块的 state 以及输入参数， 可以看到每个是数组
  });
}
```

- 获取注册到```store._mutations```对应的mutation, 通过```store.commit```方法执行。

```
commit (_type, _payload, _options) {
    // check object-style commit
   ...
   const entry = this._mutations[type];
   ...
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload);
      });
    });
   ...
```

- 对于为什么commit是状态的唯一方法， 并且是同步函数，不然下面的_committing 状态起不到作用

```javascript
_withCommit (fn) {
    const committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  }
```

## actions 
- 使用方法
```javascript
actions: {
      getHome({ state, getters, commit }, payload) {
        return new Promise((resolve, reject) => {
          commit('matution', 3)
          resolve(3)
        })
      },
    },
```
- 注册阶段, 获取到store._actions下的action, 也是个数组
- 执行的时候传入的参数有一个包含当前的dispatch commit  getters state 根getters state的对象，可以通过解构方法获取
- actions返回的结果为promise 不是的话 通过Promise.resolve()构造之。
```javascript

```

```javascript
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    ...
  });
}
```

