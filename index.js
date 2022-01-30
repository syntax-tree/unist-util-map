/**
 * @typedef {import('unist').Data} Data
 */
/**
 * @template {object} [TData=Data]
 * @typedef {import('unist').Node<TData>} Node<TData>
 * @typedef {import('unist').Parent} Parent
 */

/**
 * Function called with a node to produce a new node.
 *
 * @template {Node<object>} [OutputNode = Node]
 * @template {Node<object>} [InputNode = OutputNode]
 * @callback MapFunction
 * @param {InputNode} node Current node being processed
 * @param {number} [index] Index of `node`, or `null`
 * @param {Parent<InputNode>} [parent] Parent of `node`, or `null`
 * @returns {OutputNode} Node to be used in the new tree. Its children are not used: if the original node has children, those are mapped.
 */

/**
 * Unist utility to create a new tree by mapping all nodes with the given function.
 *
 * @template {Node<object>} [OutputNode = Node]
 * @template {Node<object>} [InputNode = OutputNode]
 * @param {InputNode} tree Tree to map
 * @param {MapFunction<OutputNode, InputNode>} iteratee Function that returns a new node
 * @returns {OutputNode} New mapped tree.
 */
export function map(tree, iteratee) {
  return preorder(tree, null, null)

  /**
   * @param {InputNode} node
   * @param {number} [index]
   * @param {Parent<InputNode>} [parent]
   * @returns {OutputNode}
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
