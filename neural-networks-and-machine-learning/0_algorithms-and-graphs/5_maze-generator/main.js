let cols, rows;
let w = 40;
let grid = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

}

function draw() {
  background(255);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }
}

function Cell(x, y) {
  this.x = x * w;
  this.y = y * w;

  this.show = function() {
    line(this.x, this.y, this.x + w, this.y);         // TOP
    line(this.x + w, this.y, this.x + w, this.y + w); // RIGHT
    line(this.x, this.y + w, this.x + w, this.y + w); // BOTTOM
    line(this.x, this.y, this.x, this.y + w)          // LEFT
  }
}