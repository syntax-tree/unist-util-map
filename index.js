export function map(tree, iteratee) {
  return preorder(tree, null, null)

  function preorder(node, index, parent) {
    var newNode = Object.assign({}, iteratee(node, index, parent))

    if (node.children) {
      newNode.children = node.children.map(function (child, index) {
        return preorder(child, index, node)
      })
    }

    return newNode
  }
}
