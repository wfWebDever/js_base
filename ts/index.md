# interface 和type区别
interface：接口，定义一些引用类型的，比如 class  function，
但可以通过extends进行继承, 
可以添加新字段，也就是声明合并

```
interface Obj {
    name: string,
    isH: boolean,
    age: number
}
interface Obj {
    aa: string
}
interface Obj2 extends Obj {
    sex: string
}

const obj: Obj2 = {
    name: 'fff',
    isH: true,
    age: 22,
    sex: 'ff',
    aa: 'aa'
}
```

type类型别名 可以用来定义所有的类型（包括基础类型）的类型别名，或者一些联合类型的别名,无法通过extents进行继承，
但可以通过交叉进行继承 
不可以添加新字段

```
type typeObj = {
    name: string
}
type typeStr= string | number | object
const a: typeStr = 11
const obj2: typeObj = {name: 'name'}
```
# 泛型


## react 与TS

对于基本类型useState("") TS会进行类型推断 从而确定参数的类型是否正确
```
const [name, setName] = useState("");
setName(1) 
// 类型“number”的参数不能赋给类型“SetStateAction<string>”的参数。
setName('1') 
```

对于引用类型 比如数组 对象等，需要用范型定义传入的类型
```
const [names, setNames] = useState([])
setNames([{ a: 1 }])
// 不能将类型“number”分配给类型“never”。
```

```
const [names, setNames] = useState<{a: number}[]>([])
setNames([{ a: 1 }])
```

## 全局变量 window的扩展 
使用类型断言
```
window.a = 1
// 类型“Window & typeof globalThis”上不存在属性“a”。

// 类型断言
interface Widnow {
  [key: string]: any
}
(window as Widnow).a = 1
````