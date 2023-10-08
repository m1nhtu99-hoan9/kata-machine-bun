export default class Queue<T> {
  public length: number;

  constructor() {}

  enqueue(item: T): void {
    throw new Error('not implemented');
  }

  deque(): T | undefined {
    throw new Error('not implemented');
  }

  peek(): T | undefined {
    throw new Error('not implemented');
  }
}
