class Mover {
    constructor() {
        this.h = 40;
        this.w = 40;
        this.mass = random(0.5, 3);

        this.location = createVector(random(width), 0);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
    }

    applyForce(force) {
        let f = force.copy()
        f.div(this.mass)
        this.acceleration.add(f)
    }

    update() {
        this.hitBoundary();
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0)
    }

    display() {
        fill(0, 255, 255);
        ellipse(this.location.x, this.location.y, this.mass * this.w, this.mass * this.h);
    }

    hitBoundary() {
        if (this.location.x > width - this.w) {
            this.location.x = width - this.w;
            this.velocity.x *= -1;
            this.acceleration.x *= -1;
        }
        if (this.location.x < 0) {
            this.location.x = 0;
            this.velocity.x *= -1;
            this.acceleration.x *= -1;
        }

        if (this.location.y > height) {
            this.location.y = height;
            this.velocity.y *= -1;
            this.acceleration.y *= -1;
        }

        if (this.location.y < 0) {
            this.location.y = 0;
            this.velocity.y *= -1;
            this.acceleration.y *= -1;
        }
    }
}