// LICENSE : MIT
"use strict";
const ObjectAssign = require("object-assign");
module.exports = function map(ast, mapFn) {
    return (function preorder(node, index, parent) {
        const newNode = ObjectAssign({}, mapFn(node, index, parent));
        if (node.children) {
            newNode.children = node.children.map(function (child, index) {
                return preorder(child, index, node);
            });
        }
        return newNode;
    }(ast, null, null));
};