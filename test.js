/**
 * @typedef {{type: 'leaf', value: string}} Leaf
 * @typedef {{type: 'node', children: Array<Node | Leaf>}} Node
 * @typedef {{type: 'root', children: Array<Node | Leaf>}} Root
 * @typedef {Root | Node | Leaf} AnyNode
 */

import test from 'tape'
import {u} from 'unist-builder'
import {map} from './index.js'

test('unist-util-map', function (t) {
  t.deepEqual(
    map(u('root', [u('node', [u('leaf', '1')]), u('leaf', '2')]), changeLeaf),
    u('root', [u('node', [u('leaf', 'CHANGED')]), u('leaf', 'CHANGED')]),
    'should map the specified node'
  )

  t.deepEqual(
    map(
      /** @type {Root} */
      ({
        type: 'root',
        children: [
          {type: 'node', children: [{type: 'leaf', value: '1'}]},
          {type: 'leaf', value: '2'}
        ]
      }),
      changeLeaf
    ),
    u('root', [u('node', [u('leaf', 'CHANGED')]), u('leaf', 'CHANGED')]),
    'should map the specified node'
  )

  t.deepEqual(
    map(u('root', [u('node', [u('leaf', '1')]), u('leaf', '2')]), nullLeaf),
    // @ts-expect-error: not valid but tested anyway.
    u('root', [u('node', [{}]), {}]),
    'should work when retuning an empty object'
  )

  t.deepEqual(
    // @ts-expect-error runtime.
    map({}, addValue),
    {value: 'test'},
    'should work when passing an empty object'
  )

  t.end()

  /**
   * @param {AnyNode} node
   * @returns {AnyNode}
   */
  function changeLeaf(node) {
    return node.type === 'leaf'
      ? Object.assign({}, node, {value: 'CHANGED'})
      : node
  }

  /**
   * @param {AnyNode} node
   * @returns {AnyNode?}
   */
  function nullLeaf(node) {
    return node.type === 'leaf' ? null : node
  }

  function addValue() {
    return {value: 'test'}
  }
})
