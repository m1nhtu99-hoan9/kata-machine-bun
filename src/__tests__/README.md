## Testing

```bash
for stem in $(ls -1 | sed -e 's/\.ts$//'); do mv "${stem}.ts" "${stem}.spec.ts"; done
```

- [x] [`BinarySearchList`](../day1/BinarySearchList.ts)
- [x] [`MazeSolver`](../day1/MazeSolver.ts)
- [x] [`DoublyLinkedList`](../day1/DoublyLinkedList.ts)

```bash
bun test DFSOnBST BTBFS BTInOrder BTPreOrder BTPostOrder
```

- [x] [`BTInOrder`](../day3/BTInOrder.ts)
- [x] [`BTPreOrder`](../day3/BTPreOrder.ts)
- [x] [`BTPostOrder`](../day3/BTPostOrder.ts)
- [x] [`BTBFS`](../day3/BTBFS.ts)
- [x] [`DFSOnBST`](../day3/DFSOnBST.ts)
- [x] [`MinHeap`](../day3/MinHeap.ts)
- [x] [`Trie`](../day3/Trie.ts)