// 'use strict'
var a = 1;
func()
// ;(function () {
//   console.log(this)
//   console.log(a, b)
//   a = 2
//   b = 3
//   console.log(a)
// })()
function func () {
  'use strict';
  console.log(a)
  var a = 2
  console.log(a)
  d = 4
  console.log(d)
}