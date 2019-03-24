let t = 0;

function setup() {
    createCanvas(600, 400);
    background(0);
}

function draw() {
    
	t += .5;
    let x = noise(t);
   	x = map(x, 0, 1, 0, width);
    stroke(255);
    line(t, height, t, x);
}