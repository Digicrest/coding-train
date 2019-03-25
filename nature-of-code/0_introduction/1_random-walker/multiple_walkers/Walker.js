class Walker {
    constructor(step_size, w, h, stroke) {
        // Starting Location
        this.x = width / 2;
        this.y = height / 2;

        // Properties
        this.w = w;
        this.h = h;
        this.step_size = step_size;
        this.color = stroke;
    }

    walk() {
        let direction = Math.floor(Math.random() * 100 + 1);

        if (direction < 25) {
            this.y -= this.step_size;
        } else if (direction < 50) {
            this.y += this.step_size;
        } else if (direction < 75) {
            this.x -= this.step_size;
        } else {
            this.x += this.step_size;
        }
    }

    display() {
        stroke(this.color);
        ellipse(this.x, this.y, this.w, this.h)
    }
}