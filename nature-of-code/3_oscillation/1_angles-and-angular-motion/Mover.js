class Mover {

    constructor(mass, color) {
        // Translate
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = mass;

        // Transform
        this.angle = 0;
        this.angularVelocity = 0;
        this.angularAcceleration = 0;

        // Properties
        this.color = color;
    }

    update() {
        // Rotate
        this.angularAcceleration = this.acceleration.mag() / this.mass;
        this.angle += this.angularVelocity;
        this.angularVelocity += this.angularAcceleration;

        // Move 
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        
        let center = createVector(width / 2, height / 2);
        let direction = center.sub(this.position);
        direction.setMag(0.1)
        
        this.acceleration = direction
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
        fill(this.color);

        applyMatrix();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        rectMode(CENTER);
        rect(0, 0, this.mass / 20, this.mass / 20);
        resetMatrix();
    }
}