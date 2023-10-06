class Node<T> {
  readonly value: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value: T) {
    this.value = value;
  }
}

export default class DoublyLinkedList<T> {
  #length = 0;
  #head?: Node<T>;
  #tail?: Node<T>;

  constructor() {}

  get length() { return this.#length; }

  prepend(item: T): void {
    const node = new Node(item);
    if (!this.#head) {
      this.#head = this.#tail = node;
    }
    else {
      this.#head!.prev = node;
      node.next = this.#head;

      this.#head = node;
    }

    this.#length++;
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length) 
      throw new RangeError('idx out of bound');

    if (this.length === 0) this.prepend(item);
    else if (this.length === idx) this.append(item);
    else {
      const node = new Node(item);
      const curr = this.getNode(idx)!;

      node.next = curr;
      node.prev = curr.prev;
      curr.prev = node;

      if (node.prev) node.prev.next = node;

      this.#length++;
    }
  }

  append(item: T): void {
    const node = new Node(item);
    if (!this.#tail) {
      this.#head = this.#tail = node;
    }
    else {
      this.#tail!.next = node;
      node.prev = this.#tail;

      this.#tail = node;
    }

    this.#length++;
  }

  remove(item: T): T | undefined {
    if (!this.#head) return undefined;
    
    let pointer = this.#head as Node<T> | null;
    
    for (let i=0; i < this.#length; i++) {
      if (pointer?.value === item) {
        return this.removeNode(pointer);
      } 
      pointer = pointer!.next;
    }

    return undefined;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) 
      throw new RangeError('idx out of bound');

    return this.getNode(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    if (idx < 0 || idx >= this.length) 
      throw new RangeError('idx out of bound');
    
    const curr = this.getNode(idx);
    console.log(this.toString());
    return this.removeNode(curr);
  }

  private getNode(idx: number): Node<T> | null | undefined {
    let pointer = this.#head as Node<T> | null | undefined;

    for (let i = 1; i <= idx; i++) {
      pointer = pointer?.next;
    }

    return pointer;
  }

  private removeNode(node?: Node<T> | null): T | undefined {
    this.#length--;

    const val = node?.value;
    if (this.#length === 0) {
      this.#head = this.#tail = undefined;
      return val;
    }

    const currPrev = node?.prev ?? null;
    const currNext = node?.next ?? null;

    if (currPrev) currPrev.next = currNext;
    if (currNext) currNext.prev = currPrev;

    if (node === this.#head) this.#head = node?.next ?? undefined;
    if (node === this.#tail) this.#tail = node?.prev ?? undefined;
    
    if (!!node) 
      node!.prev = node!.next = null;

    return val;
  }

  toString() {    
    if (this.length === 0) 
      return `[empty]`;
    
    let pointer = this.#head as Node<T> | null;
    let result = '<null>';

    while (!!pointer){
      if (pointer == this.#head) 
        result += ` <- (${pointer.value ?? 'null'})`;
      else 
        result += ` <-> (${pointer!.value ?? 'null'})`;
      
      pointer = pointer!.next;
    }
    result += ' -> <null>';
    
    return result;
  }
}
