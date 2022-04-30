/**
 * @typedef {import('unist').Node} Node
 */

/**
 * Unist utility to create a new tree by mapping all nodes with the given function.
 *
 * @param tree Tree to map
 * @param iteratee Function that returns a new node
 *
 * @type {<Tree extends Node>(tree: Tree, iteratee: import('./complex-types').MapFunction<Tree>) => Tree}
 */
export function map(tree, iteratee) {
  return preorder(tree, null, null)

  /** @type {import('./complex-types').MapFunction<any>} */
  function preorder(node, index, parent) {
    var newNode = Object.assign({}, iteratee(node, index, parent))

    if ('children' in node) {
      // @ts-expect-error Looks like a parent.
      newNode.children = node.children.map(function (
        /** @type {Node} */ child,
        /** @type {number} */ index
      ) {
        return preorder(child, index, node)
      })
    }

    return newNode
  }
}
