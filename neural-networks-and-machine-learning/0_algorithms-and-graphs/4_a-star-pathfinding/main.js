let heuristic = manhattan;

// An educated guess of how far it is between two points
function euclidean(a, b) {
  let d = dist(a.x, a.y, b.x, b.y);
  return d;
}

function manhattan(a, b) {
  let d = abs(a.x - b.x) + abs(a.y - b.y);
  return d;
}


// Grid Size
let cols = 25;
let rows = 25;

// 2D array
let grid = [];

// Open and closed sets
let openSet = [];
let closedSet = [];

// Start and end
let start;
let end;

// Width and height of each cell
let w, h;

// The road taken
let path = [];

// found a road
let done = false;

function setup() {
  createCanvas(400, 400);
  frameRate(24)

  // Grid cell size
  w = width / cols;
  h = height / rows;

  // Make 2D Array
  for (let i = 0; i < cols; i++) {
    grid.push([]);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  // Add Neighbors
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors();
    }
  }

  // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];

  openSet.push(start);

  // draw all cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].show(color(255));
    }
  }
}

function draw() {

  // Am I still searching?
  if (openSet.length > 0) {

    // Best cell to choose
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];
    // Did I finish?
    if (current === end) {
      // find the path
      path = [];
      let temp = current;
      path.push(temp);

      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      done = true;
      noLoop();
    }

    // Best option moves from openSet to closedSet
    openSet.splice(winner, 1);
    closedSet.push(current);

    // Check all the neighbors
    for (let i = 0; i < current.neighbors.length; i++) {
      let neighbor = current.neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor)) {
        let tentative_g = current.g + heuristic(neighbor, current);

        // Is this a better path than before?
        if (openSet.includes(neighbor)) {
          if (tentative_g < neighbor.g) {
            neighbor.g = tentative_g;
          }
        } else {
          neighbor.g = tentative_g;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
      }
    }
  } else {
    // no solution 
    if (done) {
      console.log("Reached the Goal!");
    } else {
      console.log("No Solution Found.");
    }

    console.log("Finished.")
    noLoop()
    return;
  }

  // Draw current state of everything 
  background(255);

  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0))
  }

  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0))
  }

  for (let i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255))
  }

  // hold mouse to change pathing heuristic
  if (mouseIsPressed) {
    fill(255, 0, 0, 200);
    ellipse(width - width / 10, 30, 20, 20)
    heuristic = euclidean;
  } else {
    heuristic = manhattan;
  }
}