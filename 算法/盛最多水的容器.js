/*
* 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai)
* 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)
* 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
* 说明：你不能倾斜容器。
* 输入：[1,8,6,2,5,4,8,3,7]
* 输出：49
* 解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49
* */

/*
* 解题思路 双指针
* 初始值：最左侧left 最右侧right，计算容积(y方向最小值作为高，x为两者之间的距离),移动指针，如果移动数字的大的一侧，
* 因为容积的高是由最小的高度决定，所以高度不会大于当前最小值的高度，加上x轴距离的减少，那么容积肯定不会增加。
* 故只能移动left right小的一方。
*
* */
var maxArea = function(height) {
  let left = 0
  let right = height.length - 1
  let max = 0
  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left))
    if (height[left] <= height[right]) {
      left += 1
    } else {
      right -= 1
    }
  }
  return max

};
