class Walker {
    constructor(step_size, stroke, using_noise) {
        this.x = width / 2;
        this.y = height / 2;

        // Properties
        this.r = 2;
        this.step_size = step_size;
        this.color = stroke;
        this.using_noise = using_noise
    }

    walk(n) {
        let direction = Math.floor(Math.random() * 4 + 1);
        let direction_noise = Math.floor(Math.random() * n / 100);

        switch (this.using_noise ? direction_noise : direction) {
            case 1:
                if (this.y - this.step_size >= 0)
                    this.y -= this.step_size;
                break;
            case 2:
                if (this.y + this.step_size <= height)
                    this.y += this.step_size;
                break;
            case 3:
                if (this.x - this.step_size >= 0)
                    this.x -= this.step_size;
                break;
            case 4:
                if (this.x + this.step_size <= width)
                    this.x += this.step_size;
                break;
        }
    }

    display() {
        stroke(this.color);
        ellipse(this.x, this.y, this.r)
    }
}