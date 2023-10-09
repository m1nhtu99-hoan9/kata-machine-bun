import { FibonacciHeap } from "@tyriar/fibonacci-heap";
import { inspect } from "node:util";

type Vertex = number;
type Distance = number;

export default function dijkstra_list(
  source: Vertex,
  sink: Vertex,
  arr: Readonly<WeightedAdjacencyList>,
): number[] {
  const prevs: Record<Vertex, Vertex | undefined> = new Array(arr.length).fill(undefined);
  const visited: Record<Vertex, boolean> = new Array(arr.length).fill(false);
  const dists: Record<Vertex, Distance> = new Array(arr.length).fill(Infinity);
  dists[source] = 0;

  const queue = new FibonacciHeap<Vertex,Distance>((a, b) => a.value! - b.value!);
  queue.insert(source, 0);

  while (!queue.isEmpty()) {
    const queueNode = queue.extractMinimum()!;
    const curr = queueNode.key;
    if (visited[curr]) continue;
    visited[curr] = true;

    if (curr === sink) break;

    console.log(`At (${curr})`)
    
    for (const { to, weight } of arr[curr]) {
      if (visited[to]) continue;
      let updated = false;

      const altDist = dists[curr] + weight;
      if (altDist < dists[to]) {
        prevs[to] = curr;
        dists[to] = altDist;
        updated = true;
      }

      console.log(`\t->(${to})${updated ? ' ⭐' : ''}`);
      if (updated) {
        console.log(`\t${inspect(pathFromPrevs(prevs, source, to))}`);
      }
      console.log(`\t\tprev = (${prevs[to]}); dist = ${dists[to]}`);

      queue.insert(to, dists[to]);
    }
  }
  
  return pathFromPrevs(prevs, source, sink);
}

function pathFromPrevs(prevs: Readonly<Record<Vertex, Vertex | undefined>>, source: Vertex, curr: Vertex) {
  const out = [];

  while (true) {
    const prev = prevs[curr];
    out.push(curr);
    if (prev === undefined) break;
    curr = prev;
  }
  
  return out.reverse();
}