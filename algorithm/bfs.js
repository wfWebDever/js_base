// 广度优先遍历

class Queue {
  constructor() {
    this.items = []
  }

  enQueue(element) {
    this.items.push(element)
  }

  deQueue() {
    return this.items.shift()
  }

  isEmpty() {
    return this.items
  }

  front() {
    return this.items[0]
  }
}
function bfs(nodes) {
  const queue = new Queue()
}
bfs()
