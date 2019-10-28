// TypeScript Version: 3.5

import {Node} from 'unist'

declare namespace unistUtilMap {
  type MapFunction = (node: Node, index: number | null, parent: Node | null) => Node
}

/**
 * unist utility to create a new tree by mapping all nodes with the given function.
 *
 * @param tree Tree to map
 * @param callback Function that returns a new node
 * @returns Node to be used in the new tree.
 *   Its children are not used: if the original node has children, those are mapped.
 */
declare function unistUtilMap(tree: Node, callback: unistUtilMap.MapFunction): Node

export = unistUtilMap
