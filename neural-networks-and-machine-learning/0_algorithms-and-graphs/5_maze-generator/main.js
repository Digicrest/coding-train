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

  // Top -> Right -> Bottom -> Left
  this.walls = [true, true, true, true];

  this.show = function() {
    if (this.walls[0]) {
      line(this.x, this.y, this.x + w, this.y);
    }
    
    if (this.walls[1]) {
      line(this.x + w, this.y, this.x + w, this.y + w);
    }
    
    if (this.walls[2]) {
      line(this.x, this.y + w, this.x + w, this.y + w);
    }
    
    if (this.walls[3]) {
      line(this.x, this.y, this.x, this.y + w)
    }
  }
}