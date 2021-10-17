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
