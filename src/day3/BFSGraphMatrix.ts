import { inspect } from "node:util";

export default function bfs(
  graph: Readonly<WeightedAdjacencyMatrix>, source: number, needle: number
  ): number[] | null {
  /* row history */
  const seen = new Array(graph.length).fill(false);
  const prev: (number | undefined)[] = new Array(graph.length).fill(undefined);

  seen[source] = true;
  const queue = [source];

  do {
    const curr = queue.shift()!;
    if (curr === needle) break;

    graph[curr].forEach((connWeight, adjCol) => {
      if (connWeight === 0 || seen[adjCol]) return;

      seen[adjCol] = true;
      prev[adjCol] = curr;
      queue.push(adjCol);
    });
    
    seen[curr] = true;
  } while (queue.length);

  /*
  console.log();
  // https://github.com/oven-sh/bun/issues/4429
  console.log('👀', inspect(_explainPrev(prev), { colors: true, depth: null }));
  console.log('👀', `seen: ${inspect(_explainSeen(seen))}`);
  */

  if (prev[needle] === undefined) return null;

  let curr = needle;
  const out = [];

  while (prev[curr] !== undefined) {
    console.log(`👣 ${inspect(out)} ++ ${curr}`);
    out.push(curr);
    curr = prev[curr]!;
    // console.log(`👀 peek prev[${curr}]: ${prev[curr]}`)
  }
  console.log('👀 ↪️', inspect(out));
  if (out.length) {
    out.push(source);
    return out.reverse();
  }
  return null;
}

function _explainPrev(path: (number | undefined)[]) {
  return path.reduce(
    (out, prevIdx, fromIdx) => {
      if (!!prevIdx) {
        out.push({ from: prevIdx, to: fromIdx }); 
      }
      return out;
    }, 
    [] as Array<({ from: number, to: number })> 
  ).toSorted((a, b) => a.from - b.from);
}

function _explainSeen(seen: boolean[]) {
  return seen.reduce((out, val, idx) => {
    if (val) {
      out.push(idx);
    }
    return out;
  }, [] as number[]);
}