Array.isArray([1]) //IE9+
;[1] instanceof Array

Object.prototype.toString.call([1]) === '[object Array]' // 对象原型的toString方法
;({}.toString.call([1]) === '[object Array]') // 既然对象原型有这个toString方法 那直接用对象实例的这个方法也可以
