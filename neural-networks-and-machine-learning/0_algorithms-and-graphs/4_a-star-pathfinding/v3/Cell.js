class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.f = 0;
      this.g = 0;
      this.h = 0;
      this.neighbors = [];
      this.previous = null;
  
      this.isObstacle = false;
  
      if (random() < 0.25) {
        this.isObstacle = true;
      }
    }
  
    addNeighbors() {
      for (let neighborX = this.x - 1; neighborX <= this.x + 1; neighborX += 1) {
        if (neighborX < 0 || neighborX >= cols) continue;
        for (let neighborY = this.y - 1; neighborY <= this.y + 1; neighborY += 1) {
          if (neighborY < 0 || neighborY >= rows) continue;
  
          // if (Math.abs((this.x + this.y) - (neighborX + neighborY)) == 1) // don't move diagonally
          if (neighborX != this.x || neighborY != this.y) // dont add yourself
            this.neighbors.push(grid[neighborX][neighborY]);
        }
      }
    }
  
    show(color) {
      // fill(color)
      if (this.isObstacle) {
        fill(0)
        noStroke()
        ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2)   
      }
    }
  }