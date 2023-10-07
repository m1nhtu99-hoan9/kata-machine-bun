function walk<T>(curr: BinaryNode<T> | null, path: T[]): T[] {
  if (!curr) return path;

  walk(curr.left, path);
  walk(curr.right, path);

  path.push(curr.value);

  return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}