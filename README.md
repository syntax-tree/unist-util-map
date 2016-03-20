# unist-util-map [![Build Status](https://travis-ci.org/azu/unist-util-map.svg?branch=master)](https://travis-ci.org/azu/unist-util-map)

Create a new Unist tree with all nodes that mapped by the provided function

## Installation

    npm install unist-util-map

## Usage

```js
const map = require("unist-util-map");
const ObjectAssign = require("object-assign");
// input
const ast = {
    "type": "root",
    "children": [
        {
            "type": "node",
            "children": [
                {"type": "leaf", "value": "1"}
            ]
        },
        {"type": "leaf", "value": "2"}
    ]
};
// tranformed
const actual = map(ast, function (node) {
    if (node.type === "leaf") {
        return ObjectAssign({}, node, {
            value: "CHANGED"
        });
    }
    // no change
    return node;
});
// output
const expected = {
    "type": "root",
    "children": [
        {
            "type": "node",
            "children": [
                {"type": "leaf", "value": "CHANGED"}
            ]
        },
        {"type": "leaf", "value": "CHANGED"}
    ]
};
assert.deepEqual(actual, expected);
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT