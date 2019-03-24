let player;

function setup() {
    createCanvas(600, 400);
    m = new Mover();

}

function draw() {
    background(255);
    m.render();
    m.edges();
    m.update();
}

class Mover {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.vel = createVector(0, 0);
        this.speed = createVector(0, 0);
    }

    update() {
        
        this.speed = p5.Vector.random2D();
        this.vel.add(this.speed);
        this.pos.add(this.vel);
        this.vel.limit(5);
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    render() {
        fill(120)
        ellipse(this.pos.x, this.pos.y, 40, 40)
    }
}