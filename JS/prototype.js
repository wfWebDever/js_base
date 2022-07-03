class A {
  constructor() {
    this.test = 'constructor'
  }
  print() {
    console.log('A')
  }
}
class B extends A {
  constructor() {
    super()
  }
  // 实现自己的方法
  print() {
    let printProto = new A().print //this.__proto__.__proto__.print //
    printProto()
    console.log('B')
  }
}
let b = new B()
A.prototype.name = 'A'
A.prototype.test = 'prototype'
console.log(b.name)
console.log(b.test)
b.print()
