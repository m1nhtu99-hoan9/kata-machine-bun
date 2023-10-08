import ArrayList from "../day1/ArrayList";
import { test_list } from "./ListTest.spec";
import { test } from "bun:test";

test("array-list", function () {
  const list = new ArrayList<number>(3);
  test_list(list);
});
