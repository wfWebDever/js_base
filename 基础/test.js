const hTotal = function () {
  const map = {}
  const reg = /^h/gi
  let start = [...document.children[0].children]
  while (start.length > 0) {
    const item = start[0]
    if (reg.test(item.tagName)) {
      map[item.tagName] = map[item.tagName] ? map[item.tagName] + 1 : 1
    }
    item.children && start.push(...item.children)
    start.shift()
  }
  console.log(map)
  return map
}
hTotal()