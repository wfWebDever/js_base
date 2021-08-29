function OBJ(a, b) {
    this.a = a
    this.b = b

}
OBJ.prototype.getA = function () {
    return this.a
}

const newFn = (...args) => {
    if (!args.length) {
        throw new TypeError('必须传入要构建的原型')
    }
    if (Object.prototype.toString.call(args[0]) !== '[object Function]') {
        throw new TypeError('传入要构建的原型为函数')
    }
    const obj = Object.create(null)
    // 设置原型
    Object.setPrototypeOf(obj, args[0].prototype)
    // 属性添加
    const returnObj = args[0].apply(obj, args.slice(1))
    // 判断返回是否是构造函数的对象
    return returnObj instanceof Object ? returnObj : obj
}
const obj = newFn(OBJ, 'a', 'b')
console.log(obj, obj.a, obj.b, obj.getA())