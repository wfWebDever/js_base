function TreeNode (val) {
  this.val = val
  this.left = this.right = null
  return this
}

// [10,5,15,3,7,null,18]
const root = new TreeNode(10)
root.left = new TreeNode(5)
root.right = new TreeNode(15)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(7)
root.right.left = new TreeNode(null)
root.right.right = new TreeNode(18)
// console.log(root)
module.exports = root
// export const a = 1