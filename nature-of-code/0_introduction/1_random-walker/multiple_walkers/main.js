let walkers;

function setup() {
    createCanvas(800, 600);
    background(255);

    walkers = [];
    for (let i = 0; i < 20; i++) {
        walkers.push(new Walker(i, 2, 2, random_color()))
    }
}

function draw() {
    for (let i = 0; i < walkers.length; i++) {
        walkers[i].walk();
        walkers[i].display();
    }
}

const random_color = () => {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);
    return [r, g, b]
}