let movers;

function setup() {
    createCanvas(500, 800);
    movers = [];

    for (let i = 0; i < 5; i++) {
        movers.push(new Mover())
    }
}

function draw() {
    background(200);
    fill(20, 20, 20);
    rect(0, height / 2, width, height)
    movers.forEach(m => {
        let air_resistance = 0.005;
        let water_resistance = 0.1;

        let gravity = createVector(0, 0.4);
        m.applyForce(gravity.mult(m.mass));

        if (m.location.y >= height - m.getComputedSize().h / 2) {
            applyFriction(m, 2);
        }

        if (m.location.y > height / 2) {
            applyDrag(m, -water_resistance);
        } else {
            applyDrag(m, -air_resistance);
        }

        m.update();
        m.display();
    });
}

function applyFriction(m, friction_coefficient) {
    let friction = m.velocity.copy();

    friction.normalize();
    friction.mult(friction_coefficient);
    m.applyForce(friction);
}


// fluid resistance
function applyDrag(m, drag_coefficient) {
    let drag = m.velocity.copy();
    drag.normalize();

    let magnitude = m.velocity.mag();

    drag.mult(drag_coefficient * magnitude * magnitude);
    m.applyForce(drag);
}