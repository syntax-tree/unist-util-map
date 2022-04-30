import type {Node, Parent} from 'unist'

export type NodeOfTree<
  Tree extends Node = never,
  Found = void
> = Tree extends Parent
  ?
      | Tree
      | NodeOfTree<
          Exclude<Tree['children'][number], Found | Tree>,
          Found | Tree
        >
  : Tree

export type MapFunction<Tree extends Node = Node> = (
  node: NodeOfTree<Tree>,
  index: number | null,
  parent: NodeOfTree<Tree> | null
) => NodeOfTree<Tree>
