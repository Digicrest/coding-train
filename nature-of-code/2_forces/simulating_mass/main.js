let movers;

function setup() {
    createCanvas(500, 400);
    movers = [];

    for (let i = 0; i < 5; i++) {
        movers.push(new Mover())
    }
}

function draw() {
    background(255);

    movers.forEach(m => {
        let gravity = createVector(0, 0.4);
        let wind = createVector(0.4, 0);
        let air_resistance = createVector(0, -0.05);

        m.applyForce(gravity.mult(m.mass));
        m.applyForce(air_resistance.div(m.mass));

        if (mouseIsPressed) {
            m.applyForce(wind.div(m.mass));
        }

        m.update();
        m.display();
    });
}