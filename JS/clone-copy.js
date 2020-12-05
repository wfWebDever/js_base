const testObj = {
  a: 1,
  b: { b1: 2, c: { d: [1, 2] } },
  c: undefined,
  d: function () {},
  e: [1, 2, 3],
  f: null,
  g: new RegExp('\d+'),
  h: Symbol(),
  i: new Set([1,2,3]),
  j: new Map()
}

// 浅拷贝
const obj1 = Object.assign({}, testObj)
// testObj.e[0] = 22
// console.log(obj1)

// 深拷贝 但是不能复制函数 和undefined 正则
const o2Copy = JSON.parse(JSON.stringify(testObj))
testObj.b.c.d = [2, 3]
console.log('JSON.parse&&JSON.parse :',o2Copy.b.c.d, o2Copy)

// 深拷贝 es5方式
// 优化算法 添加正则 函数等
const deepClone = function (source) {
  const isArr = value => Array.isArray(value)
  const isReg = value => value instanceof RegExp
  const isProto = (value, type )=> value instanceof type
  const isObj = value => value && typeof value === 'object' && !isArr(value) && !isReg(value)
  const isFun = value => typeof value === 'function'
  
  if (isArr(source)) {
    return source.map(item => deepClone(item))
  } else if (isObj(source)) {
    const res = {}
    Object.keys(source).forEach(key => {
      res[key] = deepClone(source[key])
    })
    return res
  } else {
    return source
  }
}
const clone = deepClone(testObj)
console.log('深拷贝 es5方式', clone)
testObj.e[0] = 22
console.log('深拷贝 es5方式', clone)
