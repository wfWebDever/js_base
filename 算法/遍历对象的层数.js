const o = {
  a: { x: { y: { z: 1 } }, m: 2 },
  b: { o: { p: { q: 3 } } },
  c: 3
}

const findObjDeep = (obj, deep) => {
  const dp = []
  dp[0] = Object.keys(obj)
  if (deep === 1) return dp[0]
  
  // 取所有上一层的子节点
  let childs = []
  dp[0].forEach(key => {
    if (typeof obj[key] === 'object') {
      childs.push(obj[key])
    }
  })
  // 层数从2开始
  for (let i = 1; i <= deep - 1; i++) {
    dp[i] = []
    let tmp = []
    while (childs.length > 0) {
      const child = childs.shift()
      Object.keys(child).forEach(key => {
        dp[i].push(key)
        typeof child[key] === 'object' && tmp.push(child[key])
      })
    }
    childs = tmp
  }
  console.log(dp[deep - 1])
  return dp[deep - 1]
}

findObjDeep(o, 2)