import bfs from "../day3/BFSGraphMatrix";
import { matrix2 } from "./graph";
import { test, expect } from "bun:test";

test("bfs - graph matrix", function () {
  expect(bfs(matrix2, 0, 6)).toEqual([0, 1, 4, 5, 6]);

  expect(bfs(matrix2, 6, 0)).toEqual(null);
});
