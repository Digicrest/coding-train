let m;

function setup() {
    createCanvas(600, 400);
    movers = [];
    for (let i = 1; i <= 20; i++) {
        movers.push(new Mover(i * 40, random_color()))
    }
}

function draw() {
    background(255);
    for (let i = 1; i <= movers.length; i++) {
        movers[i - 1].display();
        movers[i - 1].bounce();
        movers[i - 1].update();
    }

    fill(0)
    ellipse(this.width / 2, this.height / 2, 10, 10)
}

const random_color = () => {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);
    return [r, g, b]
}