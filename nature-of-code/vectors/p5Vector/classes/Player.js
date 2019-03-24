class Player {
    constructor(x_speed, y_speed) {
        this.w = 80;
        this.position = createVector(width / 2, height / 2 - this.w - 3);
        this.velocity = createVector(x_speed, y_speed);
    }

    move() {
        this.bounce();
        this.position.add(this.velocity);
    }

    bounce() {
        if (this.position.x + this.velocity.x >= width - this.w / 2 || this.position.x + this.velocity.x <= 0) {
            this.velocity.x *= -1;
        }

        if (this.position.y + this.velocity.y >= height - this.w || this.position.y + this.velocity.y <= 0) {
            this.velocity.y *= -1;
        }
    }

    display() {
        fill(255, 100, 100)
        square(this.position.x, this.position.y, this.w, this.w)
        fill(255, 255, 0)
        ellipse(this.position.x + this.w / 2, this.position.y + this.w / 2, 20, 20)
    }
}