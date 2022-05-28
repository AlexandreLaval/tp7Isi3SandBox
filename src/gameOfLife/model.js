import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants.js";

export class Model {
  constructor() {
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.neighbours = this.state;
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {

        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            if (nbAlive === 2) {
              this.neighbours[i][j] = this.state[i][j];
            }
            if (nbAlive === 3) {
              this.neighbours[i][j] = CELL_STATES.ALIVE;
            }
            if (nbAlive > 3 || nbAlive < 2) {
              this.neighbours[i][j] = CELL_STATES.DEAD;
            }
          }
        }
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.init();
    this.stop();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    for (let i = x-1; i <= x+1; i++) {
      for (let j = y-1; j <= y+1; j++) {
        number += (i !== x || j !== y) && this.isCellAlive(j, i) ? 1 : 0;
      }
    }
    return number;
  }

  updated() {
    this.state = this.neighbours;
    this.neighbours = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    drawGame(this);
  }
}
