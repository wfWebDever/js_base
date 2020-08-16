const root = require('./TreeNodeData')
// console.log(root.left)
//10,5,15,3,7,null,18]
var rangeSumBST = function (root, L, R) {
  if (root == null || root.val == null ) {
    return 0
  }
  // if val is < L, to find the right
  if (root.val < L) {
    return rangeSumBST(root.right,L, R)
  } else if (root.val > R) { // if val is > R, to find the left
    return rangeSumBST(root.left,L, R)
  } else if (root.val >= L && root.val <= R) { // L<=val<=R find left and right
    return root.val +  rangeSumBST(root.left, L, R) + rangeSumBST(root.right, L, R)
  }
}
console.log(rangeSumBST(root, 7 ,15))

const obj = {
  a:1,
  getA() {
    return this.a
  },
  agg: function () {
    setTimeout(this.getA, 1000)
  }
}
obj.agg()