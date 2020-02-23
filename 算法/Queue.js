//  构造队列 先进先出
class Queue {
  constructor () {
    this.items = []
  }

  enQueue (element) {
    this.items.push(element)
  }

  deQueue () {
    return this.items.shift()
  }

  isEmpty () {
    return this.items
  }

  front () {
    return this.items[0]
  }
}
export default Queue
