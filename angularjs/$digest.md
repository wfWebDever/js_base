$digest
他负责检查 scope 中的数据是否发生了变化,如果某个属性有变化,马上会通知此属性的监听器 ($watch 注册的监听器),触发监听器,执行回调函数.
$apply
这个方法和 $digest 很相似, $digest 检查scope 中的所有数据
$apply 相当于检查 rootScope 中的所有数据,他会从父级到子级来检查所有数据
$apply() == $rootScope.$digest()

$watch
这是一个监听 scope 上数据的监听器