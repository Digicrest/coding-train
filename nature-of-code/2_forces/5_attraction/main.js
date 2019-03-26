let NUM_OF_OBJECTS = 10;
let movers, attractor;

function setup() {
    createCanvas(640, 360);
    movers = [];
    for (let i = 0; i < NUM_OF_OBJECTS; i++) {
        movers.push(new Mover());
    }
    attractor = new Attractor();
}

function draw() {
    background(255);
    attractor.display();

    for (let i = 0; i < movers.length; i++) {
        let force = attractor.attract(movers[i]);
        movers[i].applyForce(force);
        movers[i].update();

        attractor.drag();
        attractor.hover(mouseX, mouseY);


        movers[i].display();
    }
}

function mousePressed() {
    attractor.clicked(mouseX, mouseY);
    console.log("pressed, calling attractor.click")
}

function mouseReleased() {
    attractor.stopDragging();
    console.log("released: dragging is stopped")
}