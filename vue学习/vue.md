
# 响应式核心
  ## 数据监控原理：
  - 用Object.defineProperty的get、set
  - 加上Dep作为数据监控依赖收集、派发更新中间件
  - 通过Watcher作为真正的数据载体
  ## 2.0缺陷
  - 对象的新加属性监控不到
  - 数组的index赋值 、length 监控不到, 对以下7种数组方法能监控到
  
```javascript
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result
  });
});
```     
  ## 3.0 改变
  - 用proxy 监控数据
  - 数组、对象直接支持
  
  ## 3.0缺陷
  - IE不支持        
# slot
- 组件定义插槽名称，预留位置，填充默认显示内容，使用方通过注明使用哪个插槽
- 如果使用方不注明使用插槽名称，且组件没有定义默认插槽，则使用方内定义的元素内容全部被丢弃。

# $mounted 
```initRender(vm);```
createElement 返回的是虚拟vnode
```javascript
function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  const options = vm.$options;
  const parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm);
    }, true);
  }
}
```
发生在```beforeCreate`` 周期内


## 子组件的mounted在父组件之前,意思是指从底开始 往上执行