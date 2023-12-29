const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const resolution = 10;
const width = 1200;
const height = 1200;
const COLS = Math.round(width / resolution);
const ROWS = Math.round(height / resolution);
const RENDER_DURATION = 1000;

function buildGrid() {
  return new Array(COLS)
    .fill(null)
    .map(() =>
      new Array(ROWS).fill(null).map(() => Math.floor(Math.random() * 2)),
    );
}

let grid = buildGrid();
requestAnimationFrame(update);

function update() {
  grid = nextGrid();
  render(grid);
  setTimeout(() => {
    requestAnimationFrame(update);
  }, RENDER_DURATION);
}

function nextGrid() {
  const nextGen = grid.map((arr) => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let neighborsCount = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
            const currentNeighbour = grid[col + i][row + j];
            neighborsCount += currentNeighbour;
          }
        }
      }
      if (cell === 1 && neighborsCount < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && neighborsCount > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && neighborsCount === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}
function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      ctx.beginPath();
      ctx.rect(col * resolution, row * resolution, resolution, resolution);
      ctx.fillStyle = cell ? "#3E172D" : "#fff";
      ctx.fill();
      //ctx.stroke();
    }
  }
}
