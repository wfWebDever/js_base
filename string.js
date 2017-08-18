


var str="  sds "
console.info("--"+str.trim()+"--");

console.info(str.charAt(2));

var str1="  aaa ff ";
console.info("|"+str1.trim()+"|");
	


String.prototype.trim=function() {
	var regular=/(^\s*)|(\s*$)/gi;
	return(this.replace(regular,""));
}

var str2="Hello ";
var str3="Word ";
var str4=" job!";
console.info(str2.concat(str3,str4));
console.info(str2.substring(0,2));
//ddd

