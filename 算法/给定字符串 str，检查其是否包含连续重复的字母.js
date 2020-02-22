function containsRepeatingLetter(str) {
  const arr = str.split('');
  let flag = false;
  for (let [index,val] of arr.entries()) {
    if (val === arr[index + 1]){
      flag = true;
      return;
    }
  }
  return flag;
}
// 用正则 引用
function containsRepeatingLetter_2(str) {
  const reg = /([a-zA-Z])\1/;
  return reg.test(str);
  
}
console.log(containsRepeatingLetter('rattler'));
