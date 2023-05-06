/**
 * @typedef {import('unist').Node} Node
 */

/**
 * @template {Node} [Kind=Node]
 *   Node type.
 * @typedef {import('./complex-types.js').MapFunction<Kind>} MapFunction
 *   Function called with a node, its index, and its parent to produce a new
 *   node.
 */

/**
 * Create a new tree by mapping all nodes with the given function.
 *
 * @template {Node} Kind
 *   Type of input tree.
 * @param {Kind} tree
 *   Tree to map.
 * @param {MapFunction<Kind>} mapFunction
 *   Function called with a node, its index, and its parent to produce a new
 *   node.
 * @param {boolean} [replaceChildren=false]
 *   Whether to replace the children of nodes with the children of the new node.
 * @returns {Kind}
 *   New mapped tree.
 */
export function map(tree, mapFunction, replaceChildren = false) {
  // @ts-expect-error Looks like a children.
  return preorder(tree, null, null, replaceChildren)

  /** @type {import('./complex-types.js').MapFunction<Kind>} */
  function preorder(node, index, parent, replaceChildren) {
    const newNode = Object.assign({}, mapFunction(node, index, parent))

    let targetNode = replaceChildren ? newNode : node

    if ('children' in targetNode) {
      // @ts-expect-error Looks like a parent.
      newNode.children = targetNode.children.map(function (
        /** @type {import('./complex-types.js').InclusiveDescendant<Kind>} */ child,
        /** @type {number} */ index
      ) {
        return preorder(child, index, targetNode, replaceChildren)
      })
    }

    return newNode
  }
}
