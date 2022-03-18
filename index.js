/**
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Node} Node
 * @typedef {Record<string, unknown> & {type: string, position?: Position|undefined}} NodeLike
 */

/**
 * Function called with a node to produce a new node.
 *
 * @callback MapFunction
 * @param {NodeLike|Node} node Current node being processed
 * @param {number} [index] Index of `node`, or `null`
 * @param {Parent} [parent] Parent of `node`, or `null`
 * @returns {NodeLike|Node} Node to be used in the new tree. Its children are not used: if the original node has children, those are mapped.
 */

/**
 * Unist utility to create a new tree by mapping all nodes with the given function.
 *
 * @param {NodeLike|Node} tree Tree to map
 * @param {MapFunction} iteratee Function that returns a new node
 * @returns {NodeLike|Node} New mapped tree.
 */
export function map(tree, iteratee) {
  return preorder(tree, null, null)

  /**
   * @param {NodeLike|Node} node
   * @param {number} [index]
   * @param {Parent} [parent]
   * @returns {Node}
   */
  function preorder(node, index, parent) {
    var newNode = Object.assign({}, iteratee(node, index, parent))

    if ('children' in node) {
      // @ts-expect-error Looks like a parent.
      newNode.children = node.children.map(function (
        /** @type {Node} */ child,
        /** @type {number} */ index
      ) {
        // @ts-expect-error Looks like a parent.
        return preorder(child, index, node)
      })
    }

    return newNode
  }
}
