export default class MinHeap<T> {
  #length = 0;
  #data: (T | undefined)[] = [];

  constructor() { }

  get length() {
    return this.#length;
  }

  insert(value: T): void {
    this.#length++;
    this.#data[this.#length - 1] = value;
    this.heapifyUp(this.#length - 1);
  }
  
  delete(): T | undefined {
    if (this.length === 0) return undefined;

    // console.log(`pre delete:\t${this.#data}`);
    const out = this.#data[0];

    if (this.length === 1) {
      this.#data = []; 
    }
    else {
      const leaveIdx = this.#length - 1;
      [this.#data[0], this.#data[leaveIdx]] = [this.#data[leaveIdx], undefined];
      this.heapifyDown(0);
    }

    this.#length--;
    // console.log(`post delete:\t${this.#data}`);
    return out;
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) return;
    console.assert(idx < this.#length, `Invalid state, idx (${idx}) larger than data length.`);

    const parentIdx = MinHeap.parentIdx(idx);
    const parentVal = this.#data[parentIdx] as T;
    const currVal = this.#data[idx] as T;

    if (currVal < parentVal) {
      this.#data[idx] = parentVal;
      this.#data[parentIdx] = currVal;
      this.heapifyUp(parentIdx);
    }
  }

  private heapifyDown(idx: number): void {
    const leftIdx = MinHeap.leftChildIdx(idx);
    const rightIdx = MinHeap.rightChildIdx(idx);

    if (idx >= this.length || rightIdx >= this.length) return;

    const leftVal = this.#data[leftIdx];
    const rightVal = this.#data[rightIdx];
    const currVal = this.#data[idx];

    // @ts-ignore
    if (leftVal > rightVal && currVal > rightVal) {
      this.#data[idx] = rightVal;
      this.#data[rightIdx] = currVal;
      this.heapifyDown(rightIdx);
    }
    // @ts-ignore
    else if (rightVal > leftVal && currVal > leftVal) {
      this.#data[idx] = leftVal;
      this.#data[leftIdx] = currVal;
      this.heapifyDown(leftIdx);
    }
    
  }

  private static parentIdx(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private static leftChildIdx(idx: number): number {
    return idx * 2 + 1;
  }

  private static rightChildIdx(idx: number): number {
    return MinHeap.leftChildIdx(idx) + 1;
  }
}