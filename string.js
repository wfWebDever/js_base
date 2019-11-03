//let str="  sds ";
//console.info("--"+str.trim()+"--");


String.prototype.trim = function () {
  const reg = new RegExp('(^\\s*)|(\\s*$)', 'g');
  return this.replace(reg, "");
};

let str2 = "Hello ";
let str3 = "Word ";
let str4 = " job! ";

console.log('--' + str4.trim() + '--');

