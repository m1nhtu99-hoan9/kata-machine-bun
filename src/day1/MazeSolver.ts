type PointDirection = "TOP" | "RIGHT" | "BOTTOM" | "LEFT";

type MoveFnOptions = {
  inplace?: boolean;
};

class PointImpl implements Point {
  public x = 0;
  public y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static from(point: Point) {
    if (!point) return null;
    return new PointImpl(point.x, point.y);
  }

  get isOutOfBound(): boolean {
    return this.x < 0 || this.y < 0;
  }

  move(direction: PointDirection, opts?: MoveFnOptions): PointImpl {
    switch (direction) {
      case "TOP":
        return this.moveUp(opts);
      case "BOTTOM":
        return this.moveDown(opts);
      case "LEFT":
        return this.moveLeft(opts);
      case "RIGHT":
        return this.moveRight(opts);
      default:
        throw new Error(`Not implemented for direction of ${direction}.`);
    }
  }

  moveUp(opts?: MoveFnOptions): PointImpl {
    const inplace = opts?.inplace;
    if (inplace) {
      this.y -= 1;
      return this;
    }
    return this.clone().moveUp({ inplace: true });
  }

  moveDown(opts?: MoveFnOptions): PointImpl {
    const inplace = opts?.inplace;
    if (inplace) {
      this.y += 1;
      return this;
    }
    return this.clone().moveDown({ inplace: true });
  }

  moveLeft(opts?: MoveFnOptions): PointImpl {
    const inplace = opts?.inplace;
    if (inplace) {
      this.x -= 1;
      return this;
    }
    return this.clone().moveLeft({ inplace: true });
  }

  moveRight(opts?: MoveFnOptions): PointImpl {
    const inplace = opts?.inplace;
    if (inplace) {
      this.x += 1;
      return this;
    }
    return this.clone().moveLeft({ inplace: true });
  }

  sameAs(point: Point): boolean {
    if (!point) return false;
    return this.x === point.x && this.y === point.y;
  }

  clone() {
    return new PointImpl(this.x, this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

class MazeSolver {
  readonly #start: Point;
  readonly #end: Point;
  readonly #wall: string;
  readonly #maze: string[];
  readonly #mazeHeight: number;
  readonly #mazeWidth: number;
  readonly #seen: boolean[][];

  readonly #result: PointImpl[] = [];

  constructor(maze: string[], wall: string, start: Point, end: Point) {
    this.#wall = wall;
    this.#start = start;
    this.#end = end;

    this.#maze = maze;
    this.#mazeHeight = maze.length;
    this.#mazeWidth = maze.length === 0 ? 0 : maze[0].length;

    this.#seen = new Array(this.#mazeHeight);
    for (let i = 0; i < this.#mazeHeight; i++) {
      this.#seen[i] = new Array(this.#mazeWidth).fill(false);
    }
  }

  run(): Readonly<Readonly<Point>[]> {
    this.walk(PointImpl.from(this.#start)!);
    return this.#result;
  }

  walk(curr: PointImpl): boolean {
    /* base cases */
    if (curr.isOutOfBound 
       || curr.x >= this.#mazeWidth || curr.y >= this.#mazeHeight)
      return false;

    if (curr.sameAs(this.#end)) {
      this.#result.push(curr);
      this.#seen[curr.y][curr.x] = true;
      return true;
    }

    // console.log(`this.#seen[curr.y]: ${JSON.stringify(this.#seen[curr.y])}`);
    console.assert(Array.isArray(this.#seen[curr.y]));
    if (this.#seen[curr.y][curr.x]) 
      return false;

    if (this.#maze[curr.y][curr.x] === this.#wall) {
      this.#seen[curr.y][curr.x] = true;
      return false;
    }

    /* pre-recursion */
    this.#seen[curr.y][curr.x] = true;
    this.#result.push(curr);

    /* recurse */
    for (const dir of ["TOP", "RIGHT", "BOTTOM", "LEFT"]) {
      const p = curr.move(dir as PointDirection);
      if (this.walk(p)) {
        /*
        console.log("--debug--");
        console.log(this.visualiseResult());
        console.log();
        */
        return true;
      }
    }

    /* post-recursion */
    this.#result.pop();
    return false;
  }

  private visualiseResult(): string {
    const maze = this.#maze.map((row) => row.split(""));
    this.#result.forEach((p) => {
      if (maze[p.y] && maze[p.y][p.x]) {
        if (p.sameAs(this.#start))
          maze[p.y][p.x] = "S";
        else if (p.sameAs(this.#end))
          maze[p.y][p.x] = "E";
        else
          maze[p.y][p.x] = "▣";
      }
    });
    return maze.map((xs) => xs.join("")).join('\n');
  }
}

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const solver = new MazeSolver(maze, wall, start, end);
  return solver.run() as Point[];
}
