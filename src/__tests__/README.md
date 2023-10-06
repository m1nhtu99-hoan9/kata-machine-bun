## Testing

```bash
for stem in $(ls -1 | sed -e 's/\.ts$//'); do mv "${stem}.ts" "${stem}.spec.ts"; done
```

- [x] `BinarySearchList`
- [x] `MazeSolver`
- [x] `DoublyLinkedList`
