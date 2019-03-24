let w; // Walker
let t = 0; // Perlin Noise Time

function setup() {
    createCanvas(1000, 400);
    background(255);

    walkers = [];

    // walkers.push(new Walker(2, 0, false))
    walkers.push(new Walker(2, [255, 0, 0], true))
}

function draw() {
    fill(255);

    t += Math.random() * .018;
    let n = noise(t);
    n = map(n, 0, 1, 0, width);

    for (let i = 0; i < walkers.length; i++) {
        walkers[i].walk(n);
        walkers[i].display();
    }
}

const random_color = () => {
    r = Math.floor(Math.random() * 255 + 1);
    g = Math.floor(Math.random() * 255 + 1);
    b = Math.floor(Math.random() * 255 + 1);
    return [r, g, b]
}