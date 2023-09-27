import binary_fn from "@code/BinarySearchList";
// @ts-ignore
import { test, expect } from "bun:test";

//`bun test BinarySearchList`

test("binary search array", function() {

    const foo = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(binary_fn(foo, 69)).toEqual(3);
    expect(binary_fn(foo, 1336)).toEqual(-1);
    expect(binary_fn(foo, 69420)).toEqual(10);
    expect(binary_fn(foo, 69421)).toEqual(-1);
    expect(binary_fn(foo, 1)).toEqual(0);
    expect(binary_fn(foo, 0)).toEqual(-1);
});

