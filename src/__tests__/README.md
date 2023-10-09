## Testing

```bash
for stem in $(ls -1 | sed -e 's/\.ts$//'); do mv "${stem}.ts" "${stem}.spec.ts"; done
```

- [x] [`BinarySearchList`](../day1/BinarySearchList.ts)
- [x] [`MazeSolver`](../day1/MazeSolver.ts)
- [x] [`DoublyLinkedList`](../day1/DoublyLinkedList.ts)

```bash
# BTBFS BTInOrder BTPreOrder BTPostOrder
bun test DFSOnBST BT
```

- [x] [`BTInOrder`](../day3/BTInOrder.ts)
- [x] [`BTPreOrder`](../day3/BTPreOrder.ts)
- [x] [`BTPostOrder`](../day3/BTPostOrder.ts)
- [x] [`BTBFS`](../day3/BTBFS.ts)
- [x] [`DFSOnBST`](../day3/DFSOnBST.ts)
- [x] [`MinHeap`](../day3/MinHeap.ts)
- [x] [`Trie`](../day3/Trie.ts)
- [x] [`BFSGraphMatrix`](../day3/BFSGraphMatrix.ts)
- [x] [`DFSGraphList`](../day3/DFSGraphList.ts)
- [x] [`DijkstraList`](../day3/DijkstraList.ts)

```log
bun test v1.0.3 (25e69c71)

__tests__/DijkstraList.spec.ts:
At (0)
        ->(1) ⭐
        [ 0, 1 ]
                prev = (0); dist = 3
        ->(2) ⭐
        [ 0, 2 ]
                prev = (0); dist = 1
At (2)
        ->(1)
                prev = (0); dist = 3
        ->(3) ⭐
        [ 0, 2, 3 ]
                prev = (2); dist = 8
At (1)
        ->(4) ⭐
        [ 0, 1, 4 ]
                prev = (1); dist = 4
At (4)
        ->(3)
                prev = (2); dist = 8
        ->(5) ⭐
        [ 0, 1, 4, 5 ]
                prev = (4); dist = 6
At (5)
        ->(6) ⭐
        [ 0, 1, 4, 5, 6 ]
                prev = (5); dist = 7
✓ dijkstra via adj list [2.02ms]

 1 pass
 0 fail
 1 expect() calls
Ran 1 tests across 1 files. [17.00ms]
```

- [x] [`LRU`](../day3/LRU.ts)