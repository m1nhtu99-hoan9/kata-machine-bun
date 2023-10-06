// @ts-ignore
import { test } from 'bun:test';
import LinkedList from "@code/DoublyLinkedList";
import { test_list } from "./ListTest.spec";

test("DoublyLinkedList", function () {
  const list = new LinkedList<number>();
  test_list(list);
});
