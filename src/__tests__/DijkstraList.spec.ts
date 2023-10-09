import dijkstra_list from "../day3/DijkstraList";
import { list1 } from "./graph";
import { test, expect } from "bun:test";

test("dijkstra via adj list", function () {
  /// waht?
  // what..
  // what...
  expect(dijkstra_list(0, 6, list1)).toEqual([0, 1, 4, 5, 6]);
});
