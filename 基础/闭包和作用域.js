
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