# v-model 
涉及到了 编译的原理，具体编译放在 ```vue核心之模版编译```章节。

- 用法
```javascript
template: `
      <div>
       <input v-model="a" />
      </div>
    `,
```

- 实际编译时转成的AST 
```javascript
"{directives:[{name:"model",rawName:"v-model",value:(a),expression:"a"}],domProps:{"value":(a)},on:{"input":function($event){if($event.target.composing)return;a=$event.targe
```

- 绑定props: value = a
- 事件: input : function($event){if($event.target.composing)return;a=$event.target.value}}})
```javascript
  ...
  addProp(el, 'value', `(${value})`);
  addHandler(el, event, code, null, true);
  ...
```
- render
```javascript
"_c('input',{directives:[{name:"model",rawName:"v-model",value:(a),expression:"a"}]," +
 "domProps:{"value":(a)}," +
  "on:{"input":function($event){if($event.target.composing)return;a=$event.target.value}}})"
```


# 组件的 v-model

```javascript
const Child = {
    template: `
       <div>
           <input :value="value"  @input="update"/>
       </div>
    `,
    props: ['value'],
    /*model: {
      prop: 'val',
      event: 'input'
    },*/
    methods: {
      update(e) {
        const val = e.target.value
        console.log('update value is',val)
        this.$emit('input', val)
      }
    }
  }
  const Home = {
    template: `<div>
            <child v-model="a"></child>
           <p>a change is {{a}}</p>
       </div>`,
    components: { Child },
    data(){
      return {
        a: 1
      }
    },
  }
```


```javascript
el.model = {
  callback: "function ($$v) {a=$$v}",
  expression: ""a"",
  value: "(a)"
}
```
render 后结果为 

```javascript
render: `with(this){
    return _c('div',[_c('child'," +
                                "{ model:{ 
                                   value:(a),
                                   callback:function ($$v) {a=$$v},
                                   expression:"a"}}),
                                _v(" "),
                                _c('p',[_v("a change is "+_s(a))])],1)}`


```

## 传给子组件的时候 
- options 子组件的参数 data 父组件传下来的数据
```javascript
function transformModel (options, data) {
  const prop = (options.model && options.model.prop) || 'value'; // 子组件prop 的属性 取当前model参数中设定的, 如果没有定义则取默认 'value'
  const event = (options.model && options.model.event) || 'input' // 子组件事件的key 同上
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value; // 
  const on = data.on || (data.on = {});
  const existing = on[event];
  const callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
```

- 结果变为如下, 故子组件可以得到父组件传下来的 'value'属性的值，以及可以emit 事件名称为 input 
- 如果 子组件有 model 参数，则可以转变props中父组件传下来的属性值比如1 赋值给新属性 'val'， 事件同理。

```javascript
data = {
  attrs: {
    value: 1
   },
  model: {value: 1, expression: "a", callback: ƒ},
  on: {
    input: function($$v){
      a=$$v
    }
  }
}

```

# 总结
- v-model 说到底是一个语法糖，用到的核心就是父组件向子组件传值，然后子组件接受值，并注册事件，当子组件变化后，通过emit再向上传递事件
  父组件也注册了接受事件，获取子组件传递上来的新值
- v-model 在自定义组件很有用。