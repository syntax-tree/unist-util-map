// LICENSE : MIT
"use strict";
const assert = require("assert");
const map = require(".");
const parse = require("@textlint/text-to-ast").parse;
const Syntax = require("@textlint/text-to-ast").Syntax;
const ObjectAssign = require("object-assign");
describe('should not traverse into children of filtered out nodes', function (t) {
    it("should map specified node", function () {
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
        const actual = map(ast, function (node) {
            if (node.type === "leaf") {
                return ObjectAssign({}, node, {
                    value: "CHANGED"
                });
            }
            // no change
            return node;
        });
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
    });
    context("when return null", function () {
        it("should map as empty object", function () {
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
            const actual = map(ast, function (node) {
                if (node.type === "leaf") {
                    return null;
                }
                // no change
                return node;
            });
            const expected = {
                "type": "root",
                "children": [
                    {
                        "type": "node",
                        "children": [
                            {}
                        ]
                    },
                    {}
                ]
            };
            assert.deepEqual(actual, expected);
        });
    });

    context("when pass empty object", function () {
        it("should work map", function () {
            const ast = {};
            const actual = map(ast, function (node) {
                return {
                    value: "test"
                };
            });
            const expected = {};
            assert.deepEqual(actual, {
                value: "test"
            });
        });
    });
});

