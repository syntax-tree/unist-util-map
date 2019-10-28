import * as map from 'unist-util-map'
import * as is from 'unist-util-is'
import {Node} from 'unist'
import {Heading, Paragraph} from 'mdast'

// $ExpectType Node
map({type: 'root'}, (node: Node) => ({type: node.type + 'test'}))
// $ExpectType Node
map({type: 'root'}, (node: Node, index: number | null) => ({
  type: node.type + 'test'
}))
// $ExpectType Node
map(
  {type: 'root'},
  (node: Node, index: number | null, parent: Node | null) => ({
    type: node.type + 'test'
  })
)
// $ExpectType Node
map({type: 'root'}, (node: Node) => {
  if (is<Heading>(node, 'heading')) {
    const depth = node.depth < 5 ? node.depth + 1 : 6
    return {
      ...node,
      depth
    }
  }

  if (is<Paragraph>(node, 'paragraph')) {
    return {
      type: 'strong',
      children: node.children
    }
  }

  return node
})
