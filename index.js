/**
 * @typedef {import('unist').Node} Node
 */

/**
 * Create a new tree by mapping all nodes with the given function.
 *
 * @template {Node} Tree
 *   Type of input tree.
 * @param {Tree} tree
 *   Tree to map.
 * @param {import('./complex-types').MapFunction<Tree>} mapFunction
 *   Function called with a node, its index, and its parent to produce a new
 *   node.
 * @returns {Tree}
 *   New mapped tree.
 */
export function map(tree, mapFunction) {
  // @ts-expect-error Looks like a children.
  return preorder(tree, null, null)

  /** @type {import('./complex-types').MapFunction<Tree>} */
  function preorder(node, index, parent) {
    var newNode = Object.assign({}, mapFunction(node, index, parent))

    if ('children' in node) {
      // @ts-expect-error Looks like a parent.
      newNode.children = node.children.map(function (
        /** @type {import('./complex-types').InclusiveDescendant<Tree>} */ child,
        /** @type {number} */ index
      ) {
        return preorder(child, index, node)
      })
    }

    return newNode
  }
}
