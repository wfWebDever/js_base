const o = {
  a: { x: { y: { z: 1 } }, m: 2 },
  b: { o: { p: { q: 3 } } },
  c: 3
}

const findObjDeep = (obj, deep) => {
  if (deep === 1) return null
  let curChilds = [obj]
  let tmpChilds = []
  let i = 2
  const keys = []
  while (i <= deep && curChilds.length > 0) {
    const parent = curChilds.shift();
    (typeof parent === 'object') && (Object.keys(parent).forEach(key => {
      i === deep && keys.push(key)
      tmpChilds.push(parent[key])
    }))
    if (curChilds.length === 0 && tmpChilds.length > 0) {
      curChilds = tmpChilds
      tmpChilds = []
      i++
    }
  }
  console.log(keys)
  return keys
}

findObjDeep(o, 5)