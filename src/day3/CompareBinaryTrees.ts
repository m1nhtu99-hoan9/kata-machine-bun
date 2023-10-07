export default function compare<T>(a: BinaryNode<T> | null, b: BinaryNode<T> | null): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false; 
  if (a.value !== b.value) return false;
  // recursion - DFS - preserving structure while traversal
  return compare(a.left, b.left) && compare(a.right, b.right);
}