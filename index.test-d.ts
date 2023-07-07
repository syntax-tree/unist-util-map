import {expectType} from 'tsd'
import type {
  Delete,
  Emphasis,
  Link,
  LinkReference,
  Heading,
  PhrasingContent,
  Strong,
  Text
} from 'mdast'
import {map} from './index.js'

const text: Text = {type: 'text', value: 'alpha'}
const heading: Heading = {type: 'heading', depth: 1, children: [text]}

// @ts-expect-error: tree needed.
map()

// @ts-expect-error: map function needed.
map(heading)

map(text, function (node) {
  expectType<Text>(node)
  return node
})

map(heading, function (node, index, parent) {
  expectType<Heading | PhrasingContent>(node)
  expectType<number | undefined>(index)
  expectType<
    Delete | Emphasis | Link | Heading | LinkReference | Strong | undefined
  >(parent)
  return node
})
