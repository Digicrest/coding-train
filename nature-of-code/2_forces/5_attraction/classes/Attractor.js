class Attractor {
    constructor() {
        this.h = 10;
        this.w = 10;
        this.mass = 10;

        this.pos = createVector(width / 2, height / 2);

        this.isDragging = false;
        this.isHovering = false;
        this.dragOffset = createVector(0, 0);
        this.G = 6.67408 * 4;
    }

    attract(m) {
        // direction
        let force = this.pos.copy().sub(m.pos);
        let distance_from_m = force.magSq();
        force.normalize();

        // magnitude
        let strength = (this.G * this.mass * m.mass) / distance_from_m;

        // putting magnitude and direction together
        force.mult(strength);

        return force;
    }

    displayRings() {
        strokeWeight(.5);
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.mass * 40, this.mass * 40);

        strokeWeight(1);
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.mass * 20, this.mass * 20);

        strokeWeight(2)
        ellipse(this.pos.x, this.pos.y, this.mass * 5, this.mass * 5);
    }

    display() {
        ellipseMode(CENTER);
        stroke(0);

        if (this.isDragging)
            fill(50);
        else if (this.isMousingOver)
            fill(100);
        else
            fill(175, 200);

        this.displayRings();

        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.mass, this.mass);
    }


    drag() {
        if (this.isDragging) {
            this.pos.x = mouseX + this.dragOffset.x;
            this.pos.y = mouseY + this.dragOffset.y;
        }
    }

    stopDragging() {
        this.dragging = false;
    }

    clicked(mX, mY) {
        let distance_to_mouse = dist(this.pos.x, this.pos.y, mX, mY);

        if (distance_to_mouse < this.mass) {
            this.dragging = true;
            this.dragOffset.x = this.pos.x - mX;
            this.dragOffset.y = this.pos.y - mY;
        } else {
            console.log("not met")
        }
    }

    hover(mX, mY) {
        let distance_to_mouse = dist(this.pos.x, this.pos.y, mX, mY);
        if (distance_to_mouse < this.mass) {
            this.isHovering = true;
        } else {
            this.isHovering = false;
        }
    }
}