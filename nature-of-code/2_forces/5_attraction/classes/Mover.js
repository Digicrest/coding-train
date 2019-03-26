class Mover {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.velocity = createVector(1, 0);
        this.acceleration = createVector(0, 0);
        
        let larger = random();
        this.mass = larger > 0.96 ? random(2, 8) : random(0.5, 2);

        this.h = 40;
        this.w = 40;
    }

    applyForce(force) {
        let f = force.copy().div(this.mass)
        this.acceleration.add(f)
    }

    update() {
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0)
    }

    display() {
        stroke(0);
        strokeWeight(2);
        fill(127);
        ellipse(this.pos.x, this.pos.y, this.mass * 16, this.mass *16);
    }

    checkEdges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if (this.pos.y > height) {
            this.velocity.y *= -1;
            this.pos.y = height;
        }

        if (this.pos.y < 0) {
            this.velocity.y *= -1;
            this.pos.y = 0;
        }
    }
}