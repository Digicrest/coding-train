let cols, rows;
let w = 20;
let grid = [];

let current;
let stack = [];

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

  current = grid[0];
}

function draw() {
  background(255);

  for (let i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  current.visited = true;
  
  // STEP 1
  let next = current.checkNeighbors();
  
  // STEP 2
  if(current.checkNeighbors()){
     stack.push(current); 
  } else if(stack.length > 0){
    current = stack.pop()
  } else {
     console.log("finished") 
    noLoop()
  }
  
  
  if(next) {
    next.visited = true;
    
    // 
    current.removeWalls(next)
    // STEP 4
    current = next; 
  }
  
}


const index = (x, y) => {
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  return x + y * cols;
}

function Cell(x, y) {
  this.x = x * w;
  this.y = y * w;

  this.visited = false;

  // Top -> Right -> Bottom -> Left
  this.walls = [true, true, true, true];

  this.show = function() {
    stroke(1);

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

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(this.x, this.y, w, w);
    }
  }

  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(x, y - 1)];
    let right = grid[index(x + 1, y)];
    let bottom = grid[index(x, y + 1)];
    let left = grid[index(x - 1, y)];


    [top, right, bottom, left].forEach(n => {
      if (n && !n.visited) {
        neighbors.push(n);
      }
    });

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      
      let chosen_neighbor = neighbors[r];
      return chosen_neighbor;
    }
  }
  
  this.removeWalls = function(other) {
      if(other.x > this.x) {
        this.walls[1] = false;
        other.walls[3] = false;
      } else if(other.x < this.x) {
        this.walls[3] = false;
        other.walls[1] = false; 
      }
    
      if(other.y > this.y) {
        this.walls[2] = false;
        other.walls[0] = false;
      } else if(other.y < this.y) {
        this.walls[0] = false;
        other.walls[2] = false; 
      } 
  }
}