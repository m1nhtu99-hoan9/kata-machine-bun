type Node<T> = { value: T, next?: Node<T>, prev?: Node<T> };

function makeNode<T>(val: T) {
  return { value: val } as Node<T>;
}

export default class LRU<K, V> {
  #head?: Node<V> = undefined;
  #tail?: Node<V> = undefined;
  #lookup = new Map<K, Node<V>>();
  #reverseLookup = new Map<Node<V>, K>();

  constructor(public readonly capacity = 10) { }

  get length() {
    return this.#lookup.size;
  }

  update(key: K, value: V): void {
    if (!this.#lookup.has(key)) {
      const node = makeNode(value);
      this.prepend(node);
      this.#lookup.set(key, node);
      this.#reverseLookup.set(node, key);
      
      this.trimCache();
    } else {
      const node = this.#lookup.get(key)!;
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    if (!this.#lookup.has(key))
      return undefined;

    const node = this.#lookup.get(key)!;

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: Node<V>): K | undefined {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.#head === node) {
      this.#head = this.#head.next;
    }

    if (this.#tail === node) {
      this.#tail = this.#tail.prev;
    }
    node.prev = undefined;
    node.next = undefined;

    return this.#reverseLookup.get(node);
  }

  private prepend(node: Node<V>): K | undefined {
    if (this.#head === undefined) {
      this.#head = this.#tail = node;
      return;
    }

    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;

    return this.#reverseLookup.get(node);
  }

  private trimCache(): K | undefined {
    if (this.length <= this.capacity || !this.#tail)
      return undefined;

    const tail = this.#tail!;
    const key = this.detach(tail)!;
    this.#lookup.delete(key);
    this.#reverseLookup.delete(tail);
    return key;
  }
}
