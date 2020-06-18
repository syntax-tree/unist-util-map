'use strict'

var test = require('tape')
var assign = require('object-assign')
var u = require('unist-builder')
var map = require('.')

test('unist-util-map', function (t) {
  t.deepEqual(
    map(u('root', [u('node', [u('leaf', '1')]), u('leaf', '2')]), changeLeaf),
    u('root', [u('node', [u('leaf', 'CHANGED')]), u('leaf', 'CHANGED')]),
    'should map the specified node'
  )

  t.deepEqual(
    map(u('root', [u('node', [u('leaf', '1')]), u('leaf', '2')]), nullLeaf),
    u('root', [u('node', [{}]), {}]),
    'should work when retuning an empty object'
  )

  t.deepEqual(
    map({}, addValue),
    {value: 'test'},
    'should work when passing an empty object'
  )

  t.end()

  function changeLeaf(node) {
    return node.type === 'leaf' ? assign({}, node, {value: 'CHANGED'}) : node
  }

  function nullLeaf(node) {
    return node.type === 'leaf' ? null : node
  }

  function addValue() {
    return {value: 'test'}
  }
})
