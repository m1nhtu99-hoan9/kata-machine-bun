export default class ArrayList<T> {
  public length: number;

  constructor(length: number) { 
    throw new Error('not implemented');
  }

  prepend(item: T): void {
    throw new Error('not implemented');
  }

  insertAt(item: T, idx: number): void {
    throw new Error('not implemented');
  }

  append(item: T): void {
    throw new Error('not implemented');
  }

  remove(item: T): T | undefined {
    throw new Error('not implemented');
  }

  get(idx: number): T | undefined {
    throw new Error('not implemented');
  }

  removeAt(idx: number): T | undefined {
    throw new Error('not implemented');
  }
}