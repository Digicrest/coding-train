let a = 0;
let aVelocity = 0;
let aAcceleration = .0;

function setup() {
    createCanvas(600, 400);
    background(255);
}

function draw() {
    background(255);

    a += aVelocity;
    aVelocity += aAcceleration;
    
    fill(150)
    rect(50, 50, 100, 40)
    
    applyMatrix();
    translate(width/2, height/2);
    rotate(a);
    fill(0)
    rect(0,0,100,40);
    resetMatrix();
}