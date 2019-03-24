let w;

function setup() {
    createCanvas(800, 600);
    p = new Player(10, 2);
    // frameRate(5)
}

function draw() {
    background(255);
    line(0, height / 2, width, height / 2)
    line(width / 2, 0, width / 2, height)

    p.move();
    p.display();

    fill(255, 255, 0)
    ellipse(width / 2, height / 2, 20, 20)
    strokeWeight(3)
    line(width / 2, height / 2, p.position.x + p.w / 2, p.position.y + p.w / 2);
    strokeWeight(1)
    fill(255)
}