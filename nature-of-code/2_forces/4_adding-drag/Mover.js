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
        fill(100, 100, 100);
        ellipse(this.location.x, this.location.y, this.mass * this.w, this.mass * this.h);
    }

    hitBoundary() {
        if (this.location.x > width - this.getComputedSize().w) {
            this.location.x = width - this.w;
            this.velocity.x *= -1;
        }
        if (this.location.x < 0) {
            this.location.x = 0;
            this.velocity.x *= -1;
        }

        if (this.location.y + this.getComputedSize().h / 2 > height) {
            this.location.y = height - this.getComputedSize().h / 2
            this.velocity.y *= -1;
        }

        if (this.location.y < 0) {
            this.location.y = 0;
            this.velocity.y *= -1;
        }
    }

    getComputedSize() {
        return {
            w: this.mass * this.w,
            h: this.mass * this.h
        }
    }
}