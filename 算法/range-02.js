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
    constructor() {
        this.list = []
    }
    add(range) {
        const list = this.list
        if (!list.length) {
            list.push(range[0], range[1])
            return 
        }
        // fron end item to  compare
        let right = list.length - 1 
        // 1 5 10 20 8 11
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify
     beginning and end of range.
     */
    remove(range) {
        
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        const list = this.list
        console.log('list', list)
    }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
// weifeng add the test case
// rl.add([3, 30]);
// rl.print();

console.log('remove begin ...')
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
rl.remove([1, 21]);
rl.print();
// Should display: [1,1)