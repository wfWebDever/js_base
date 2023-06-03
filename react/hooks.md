要学习看官方文档 

# hooks
react 组件随着状态(props state)的改变，每一次重新渲染都有它单独的props state 函数 effect 等所有。
除非设置了依赖项，比如effect 设置了[a]，当a不变时effect不会重新执行，或者callback函数的[a]，a不变时callback的函数保持不变。

## Effect 开发环境执行2次
开发环境下 effect会执行2次 是因为有些问题不好排查 ，比如一个组件在加载后触发一个外部服务的连接，然后切换到另一个组件后，上个组件卸载，
但是没有取消连接服务，此后当又切换到该组件时重新连接服务，这样服务连接的会越来越多，遇到服务累积的问题不好排查，
为了更好的让开发者发现这一问题，开发模式下，effect会执行2次 以便开发者很好的定位问题，然后执行清理函数，进行服务的卸载等操作
一些需要清理函数的操作：事件订阅 动画 第三方服务订阅 数据获取(可以不用effect 用其他库取代比如useSWR)
(原文出处https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)

