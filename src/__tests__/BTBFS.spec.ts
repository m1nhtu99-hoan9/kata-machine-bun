import bfs from "../day3/BTBFS";
import { tree } from "./tree";

import { test, expect } from "bun:test";

test("bt bfs", function () {
  expect(bfs(tree, 45)).toEqual(true);
  expect(bfs(tree, 7)).toEqual(true);
  expect(bfs(tree, 69)).toEqual(false);
});
