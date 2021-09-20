/*给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。
示例 1：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
*/

var threeSum = function(nums) {
    // [-4,-1,-1,-1,0,1,2]
    // 设置三个指针， k i j  k是初始位置 i j分别是是k的下一位和数组最后一位
    if (!nums || !Array.isArray(nums) || !nums.length || nums.length <= 2) {
        return []
    }
    nums = nums.sort((a, b) => a - b)
    let k = 0;
    const arr = new Set([])
    while (k <= nums.length - 3) {
        if (nums[k] > 0) {
            return Array.from(arr)
        }
        while (nums[k] === nums[k - 1]) {
            k = k + 1
        }
        let i = k + 1
        let j = nums.length - 1
        while (i < j) {
            const s = nums[k] + nums[i] + nums[j]
            if (s < 0) {
                // 小于0 说明i的值偏小 需要往前移动，而且不能是重复的
                i = i + 1
                while (nums[i] === nums[i -1] && i < j) {
                    i = i + 1
                }
            }
            else if (s === 0) {
                arr.add([nums[k],nums[i], nums[j]])
                i++
                j--
                while (nums[i] === nums[i - 1] && i < j) {
                    i++
                }
                while (nums[j] === nums[j + 1] && i < j)  {
                    j--
                }
            }
            else if (s > 0) {
                j--
                while (nums[j] === nums[j + 1] && i < j)  {
                    j--
                }
            }
        }
        k = k + 1

    }
    return Array.from(arr)
};
const nums = [-4,-1,-1,-1,0,1,2]
console.log(threeSum(nums))
