// Problem Set below:
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range
// includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,
// 201)
/** *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

class RangeList {
  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify
   beginning and end of range.
   */
  add(range) {
    if (!range || range.length < 2) {
      return
    }
    const min = range[0]
    const max = range[1]
    if (min >= max) {
      return
    }
    let list = (this.list = this.list || [])
    if (!list.length) {
      list.push(range)
      return
    }

    let minIndex = this.findIndex(min)
    let maxIndex = this.findIndex(max)

    // insert or unit
    if (minIndex === maxIndex) {
      if (min > list[minIndex][1]) {
        list.splice(minIndex + 1, 0, [min, max])
      } else if (max < list[minIndex][0]) {
        list.splice(minIndex, 0, [min, max])
      } else {
        list[minIndex] = [
          Math.min(min, list[minIndex][0]),
          Math.max(max, list[minIndex][1]),
        ]
      }
    }
    // change
    if (maxIndex > minIndex) {
      if (min > list[minIndex][1]) {
        list[maxIndex] = [
          Math.min(min, list[maxIndex][0]),
          Math.max(max, list[maxIndex][1]),
        ]
      } else {
        list.splice(minIndex, maxIndex - minIndex + 1, [
          Math.min(min, list[minIndex][0]),
          Math.max(max, list[maxIndex][1]),
        ])
      }
    }
    // console.log(list)
  }

  /**
   * find the range 's must near index
   * @param number value
   */
  findIndex(value) {
    for (let [index, item] of this.list.entries()) {
      if (value >= item[0] && value <= item[1]) {
        return index
      }
      const nextItem = this.list[index + 1]
      if (value > item[1] && ((nextItem && value < nextItem[0]) || !nextItem)) {
        return index
      }
      if (value < item[0] && index === 0) {
        return index
      }
    }
    // return -1
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify
   beginning and end of range.
   */
  remove(range) {
    if (!range || range.length < 1) {
      return
    }
    const min = range[0]
    const max = range[1]
    if (min >= max) {
      return
    }
    let list = (this.list = this.list || [])
    let minIndex = this.findIndex(min)
    let maxIndex = this.findIndex(max)
    // in the same index
    if (minIndex === maxIndex) {
      const item = list[minIndex]
      if (min === item[0]) {
        max > item[1]
          ? list.splice(minIndex, 1)
          : list.splice(minIndex, 1, [max, item[1]])
      } else if (min > item[0] && min < item[1]) {
        max >= item[1]
          ? list.splice(minIndex, 1, [item[0], min])
          : list.splice(minIndex, 1, [item[0], min], [max, item[1]])
      }
    }
    if (maxIndex > minIndex) {
      if (min >= list[minIndex][0]) {
        max < list[maxIndex][1]
          ? list.splice(
              minIndex,
              maxIndex - minIndex + 1,
              [list[minIndex][0], min],
              [max, list[maxIndex][1]]
            )
          : list.splice(minIndex, maxIndex - minIndex + 1, [
              list[minIndex][0],
              min,
            ])
      } else {
        max < list[maxIndex][1]
          ? list.splice(
              minIndex,
              maxIndex - minIndex + 1,
              [min, list[minIndex][0]],
              [max, list[maxIndex][1]]
            )
          : list.splice(minIndex, maxIndex - minIndex + 1, [
              min,
              list[minIndex][0],
            ])
      }
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const pri = this.list
      .reduce((acc, item) => {
        acc.push(`[${item[0]}, ${item[1]})`)
        return acc
      }, [])
      .join(' ')
    console.log(pri)
    return pri
  }
}

// Example run
const rl = new RangeList()
rl.add([1, 5])
rl.print()
// Should display: [1, 5)
rl.add([10, 20])
rl.print()
// Should display: [1, 5) [10, 20)
rl.add([20, 20])
rl.print()
// Should display: [1, 5) [10, 20)
rl.add([20, 21])
rl.print()
// Should display: [1, 5) [10, 21)
rl.add([2, 4])
rl.print()
// Should display: [1, 5) [10, 21)
rl.add([3, 8])
rl.print()
// Should display: [1, 8) [10, 21)
// weifeng add the test case
// rl.add([3, 30]);
// rl.print();

console.log('remove begin ...')
rl.remove([10, 10])
rl.print()
// Should display: [1, 8) [10, 21)
rl.remove([10, 11])
rl.print()
// Should display: [1, 8) [11, 21)
rl.remove([15, 17])
rl.print()
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19])
rl.print()
// Should display: [1, 3) [19, 21)
rl.remove([1, 21])
rl.print()
// Should display: [1,1)
