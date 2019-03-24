let t = 0;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    fill(255);
    
	t += .018;
    let x = noise(t);
   	x = map(x, 0, 1, 0, width);
    ellipse(x, height/2, 40, 40);
}