# hooks
react 组件随着状态(props state)的改变，每一次重新渲染都有它单独的props state 函数 effect 等所有。
除非设置了依赖项，比如effect 设置了[a]，当a不变时effect不会重新执行，或者callback函数的[a]，a不变时callback的函数保持不变。

