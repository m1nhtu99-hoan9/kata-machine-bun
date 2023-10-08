function walk<T>(curr: BinaryNode<T> | null, path: T[]): T[] {
  if (!curr) return path;
  
  // pre
  path.push(curr.value);

  // recurse
  walk(curr.left, path);
  walk(curr.right, path);

  // post

  return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}