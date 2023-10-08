import compare from "../day3/CompareBinaryTrees";
import { tree, tree2 } from "./tree";
import { test, expect } from "bun:test";

test("Compare Binary Trees", function () {
  expect(compare(tree, tree)).toEqual(true);
  expect(compare(tree, tree2)).toEqual(false);
});
