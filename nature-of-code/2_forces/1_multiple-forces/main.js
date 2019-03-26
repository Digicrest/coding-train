let m;

function setup() {
    createCanvas(500, 400);
    m = new Mover();
}

function draw() {
    background(255);

    let gravity = createVector(0, 0.4);
    m.applyForce(gravity);

    if (mouseIsPressed) {
        let wind = createVector(0.4, 0);
        m.applyForce(wind);
    }
    m.update();
    m.display();
}