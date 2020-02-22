在F12打开时，进入开发者模式，浏览器不会强制缓存，所以必须在代码里手动不强制get请求的缓存。

主要有两种方法：
1、在所有的get请求后加时间戳：new Date().getTime();但是这个方法太过繁琐；
2、第二种方法就是不设置get请求的缓存，主要是加入以下代码：


1 consoleApp.config(function ($stateProvider, $urlRouterProvider,$httpProvider) { 2 //initialize get if not there 3 if (!$httpProvider.defaults.headers.get) { 4 $httpProvider.defaults.headers.get = {}; 5 } 6 7 // Answer edited to include suggestions from comments 8 // because previous version of code introduced browser-related errors 9 10 //disable IE ajax request caching11 $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT'; 12 // extra13 $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache'; 14 $httpProvider.defaults.headers.get['Pragma'] = 'no-cache'; 15 });
