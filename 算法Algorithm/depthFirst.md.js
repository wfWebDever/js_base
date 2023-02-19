// 深度优先遍历算法

// 所有节点数据初始值为 白色， 代表未探索过
const initColor = (data) => {
  const color = {}
  data.map((item) => {
    color[item.id] = 'white'
  })
  return { color }
}

const dfs = (data) => {
  const { color } = initColor(data)
}
