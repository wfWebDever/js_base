与其他指令一样，ng-if指令也会创建一个子级作用域，因此，如果在ng-if指令中添加了元素，并向元素属性增加 ng-model指令，那么ng-model指令对应的作用域属性子级作用域，而并非控制器注入的$scope作用域对象，这点在进行双向数据绑定时，需要引起注意。
1. <!DOCTYPE html>    
2. <html ng-app="myApp">    
3. <head>    
4. <meta charset="UTF-8">    
5. <script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>    
6. <style>  
7.   .frame{  
8.     padding: 5px 8px;  
9.     margin: 0px;  
10.     font-size: 12px;  
11.     width: 320px;  
12.     background-color: #eee;  
13.   }  
14.   .frame div{  
15.     margin: 5px 0px;  
16.   }  
17. </style>   
18. </head>    
19. <body>    
20.   <div ng-controller="myCtrl" class="frame">  
21.     <div>  
22.       a 的值： {{a}}  
  
23.       b 的值： {{b}}  
24.     </div>  
25.     <div>  
26.       普通方式： <input type="checkbox" ng-model="a">  
27.     </div>  
28.     <div ng-if="!a">  
29.       ngIf方式：<input type="checkbox" ng-model="$parent.b">  
30.     </div>  
31.   </div>  
32.   
33.   <script>  
34.     angular.module('myApp', [])  
35.       .controller('myCtrl', function($scope){  
36.         $scope.a = false;  
37.         $scope.b = false;  
38.       })  
39.   </script>  
40. </body>    
41. </html>    

        在ng-if方式中，每个包含的元素都拥有自己的作用域，因此，复选框元素也拥有自己的$scope作用域。相对于控制器作用域来说，这个作用域属于一个子级作用域，所以，如果它想绑定控制器中的变量值，必须添加$parent标识，只有这样才能访问到控制器中的变量。
        因此，解决ng-if中ng-model值无效的问题，主要方法就是在绑定值时添加$parent标识，或者用ng-show指令代替ng-if指令，这两种方法都可以达到同样的页面效果。