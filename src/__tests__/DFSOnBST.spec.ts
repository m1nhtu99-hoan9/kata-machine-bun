import dfs from "../day3/DFSOnBST";
import { tree } from "./tree";
import { test, expect } from "bun:test";

test("DFS on BST", function () {
  expect(dfs(tree, 45)).toEqual(true);
  expect(dfs(tree, 7)).toEqual(true);
  expect(dfs(tree, 69)).toEqual(false);
});
