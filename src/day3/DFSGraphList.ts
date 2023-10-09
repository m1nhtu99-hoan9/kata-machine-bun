export default function dfs(
  graph: Readonly<WeightedAdjacencyList>,
  source: number,
  needle: number): number[] | null {

  const out: number[] = [];

  return (function walk(curr: number, seen: boolean[], path: number[]): boolean {
    if (seen[curr]) return false;

    seen[curr] = true;

    // pre-recursion
    path.push(curr);

    // base case
    if (curr === needle) return true;
    
    // recurse
    const adjEdges = graph[curr];
    for (const [ { to }, from ] of adjEdges.map<[GraphEdge, number]>((x, i) => [x, i])) {
      console.log(`👣 from ${from} to ${to}`);
      if (walk(to, seen, path)) return true;
    }

    // post-recursion
    path.pop();
    return false;
  })(source, new Array(graph.length).fill(false), out) ? out : null;
}