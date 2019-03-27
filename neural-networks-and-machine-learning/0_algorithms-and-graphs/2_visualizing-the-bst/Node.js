class Node {
    constructor(n) {
      this.value = n;
      this.left = null;
      this.right = null;
      this.visited = false;
      this.x = null;
      this.y = null;
      this.radius = 10;
    }
  
    add(n) {
      if (n.value < this.value) {
        if (!this.left) {
          this.left = n;
          this.left.x = this.x - 50;
          this.left.y = this.y + 20;
        } else
          this.left.add(n)
      } else if (n.value > this.value) {
        if (!this.right) {
          this.right = n;
          this.right.x = this.x + 50;
          this.right.y = this.y + 20;
        } else
          this.right.add(n)
      }
    }
  
    search(val) {
      if (this.value == val) {
        return this;
      } else if (val < this.value && this.left != null) {
        return this.left.search(val)
      } else if (val > this.value && this.right != null) {
        return this.right.search(val)
      }
    }
  
  
    visit() {
      if (this.left != null) {
        this.left.visit();
        line(this.x - this.radius * 0.6, this.y, this.left.x + this.radius * 2, this.left.y - 9)
      }
  
      fill(255);
      if (this.x) {
        applyMatrix()
        translate(this.x, this.y);
        text(this.value, 0, 0);
        fill(0, 0, 0, 0);
        ellipse(8, -4, this.radius * 2, this.radius * 2);
        resetMatrix();
      }
  
      this.visited = true;
  
      if (this.right != null) {
        this.right.visit();
        line(this.x + this.radius * 2, this.y + 2, this.right.x - this.radius * 0.6, this.right.y - 9)
      }
    }
  }