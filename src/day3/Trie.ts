class TrieNode {
  readonly children: (TrieNode | undefined)[];
  endOfWord = false;

  constructor(public value: string) {
    this.children = new Array(26).fill(undefined);
  }

  private static readonly charCodeZero = "a".charCodeAt(0);

  static charToCode(chr: string): number {
    return chr.toLowerCase().charCodeAt(0) - TrieNode.charCodeZero;    
  }
}

export default class Trie {
  readonly #root = new TrieNode("");

  constructor() { }

  insert(item: string): void {
    const leaveNode = this.walkAndPopulate(item);
    leaveNode.endOfWord = true;
  }

  delete(item: string): void {
    const leaveNode = this.walkAndPopulate(item);
    leaveNode.endOfWord = false;
  }

  find(partial: string): string[] {
    let curr = this.#root;

    for (const chr of partial) {
      let chrNode = curr.children[TrieNode.charToCode(chr)];
      if (!chrNode) return [];
      curr = chrNode;
    }

    // pre-order depth-first traversal 
    return (function dfs(node: TrieNode, partial: string, results: string[]): string[] {
      console.log(`dfs(${node.value}, '${partial}',\n\t[${results}])`);

      if (node.endOfWord)
        results.push(partial);
      
      // console.log('--pre-recursion--');
      // console.log(`  node chilren: ${node.children.map(x => x?.value)}`)

      /* implicit base case: return 'results' when there are no 'dfs' calls with non-null 'chrNode'. */
      for (const chrNode of node.children.filter(x => !!x)) {
        dfs(chrNode!, partial + chrNode?.value, results);
      }

      // console.log('--post-recursion--');
      return results; 
    })(curr, partial, []);
  }
  
  private walkAndPopulate(item: string): TrieNode {
    let curr = this.#root;
    for (const chr of item) {
      const chrCode = TrieNode.charToCode(chr);
      curr.children[chrCode] ??= new TrieNode(chr)
      curr = curr.children[chrCode]!;
    }
    return curr;
  }
}