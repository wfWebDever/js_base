// 给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。
/*
* 示例：

输入: "sea", "eat"
输出: 2
解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"
* */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  if (!word1 || !word2) {
    return 0
  }
  const w1 = word1.split('')
  const w2 = word2.split('')
  let s1 = 0
  let e1 = w1.length - 1
  let s2 = 0
  let e2 = w2.length - 1
  let step = 0
  while (s1 < e1 && s2 < e2) {
    if (w1[s1] !== w2[s2]) {
      s1 += 1
      step += 1
    }
    if (w1[e1] !== w2[e2]) {
    }
  }
}

console.log(minDistance('sea', 'eat'))
