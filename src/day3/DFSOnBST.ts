export default function dfs<T>(head: Readonly<BinaryNode<T> | null>, needle: Readonly<T>): boolean {
  if (!head) return false;

  if (head.value === needle) return true;
  if (head.value < needle)
    return dfs(head.right, needle);
  return dfs(head.left, needle);
}