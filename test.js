/**
 * @typedef {import('mdast').Root} Root
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {u} from 'unist-builder'
import {map} from 'unist-util-map'

test('map', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('unist-util-map')).sort(), [
      'map'
    ])
  })

  await t.test('should map the specified node', async function () {
    /** @type {Root} */
    const tree = u('root', [u('paragraph', [u('text', '1')]), u('text', '2')])

    assert.deepEqual(
      map(tree, changeLeaf),
      u('root', [u('paragraph', [u('text', 'CHANGED')]), u('text', 'CHANGED')])
    )
  })

  await t.test('should map the specified node', async function () {
    /** @type {Root} */
    const tree = u('root', [u('paragraph', [u('text', '1')]), u('text', '2')])

    assert.deepEqual(
      map(tree, changeLeaf),
      u('root', [u('paragraph', [u('text', 'CHANGED')]), u('text', 'CHANGED')])
    )
  })

  await t.test('should work when passing an empty object', async function () {
    assert.deepEqual(
      // @ts-expect-error: check how not-a-node is handled.
      map({}, function () {
        return {value: 'test'}
      }),
      {value: 'test'}
    )
  })
})

/**
 * @type {import('./index.js').MapFunction<Root>}
 */
function changeLeaf(node) {
  return node.type === 'text' ? {...node, value: 'CHANGED'} : node
}
