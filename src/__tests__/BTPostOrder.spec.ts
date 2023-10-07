import bt_post_order from "../day3/BTPostOrder";
import { tree } from "./tree";

// @ts-ignore
import { test, expect } from "bun:test";

test("post order", function () {
  expect(bt_post_order(tree)).toEqual([7, 5, 15, 10, 29, 45, 30, 100, 50, 20]);
});
