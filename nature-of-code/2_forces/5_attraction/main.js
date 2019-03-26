let NUM_OF_OBJECTS = 200;
let movers, attractor;

function setup() {
    createCanvas(1080, 720);
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

        let dist = movers[i].pos.dist(attractor.pos);
        movers[i].display();
        if(dist < 50) {
         	movers.splice(i, 1)   
        } 
    }
    
    let s = `Bodies: ${movers.length}`;
    fill(200, 100, 240);
    text(s, 40, 40, 60, 80);
}

function mousePressed() {
    attractor.clicked(mouseX, mouseY);
    console.log("pressed, calling attractor.click")
}

function mouseReleased() {
    attractor.stopDragging();
    console.log("released: dragging is stopped")
}