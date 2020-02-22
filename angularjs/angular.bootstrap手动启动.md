1、常见的方式是绑定在页面中 如
<html ng-app="myapp">......
var myapp=angular.module("myapp",[]);
....
2、另一种方式是调用bootstrap来启动,并且在页面加载完后启动;
angular.element(document).ready(function(){
angular.bootstrap(document,['myapp']);
})
 这个函数会自动检测创建的module有没有浏览器加载或者加载多次，
如果有则会在浏览器的控制台打出警告日志，并且不会再次加载。
这样可以避免在程序运行过程中许多奇怪的问题发生。