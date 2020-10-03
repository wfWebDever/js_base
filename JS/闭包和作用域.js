// 闭包
// 就看自己整理的重学JS中的内容就行
// 网上的其他资料都不如书中解释的对
//
/*first*/
function f1 () {
  function f2 () {
    console.log(a)
  }
  f2()
}

function f3 () {
  let a = 2
  f1()
}

f3()





/*second*/
// let a = 1
// function f1 () {
//   function f2 () {
//     console.log(a)
//   }
//   return f2
// }
//
// function f3 () {
//   let a = 2
//   f1()()
// }
//
// f3()