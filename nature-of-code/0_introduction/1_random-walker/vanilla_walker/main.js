let w;

function setup() {
	createCanvas(800, 600);
	background(255);
	
	w = new Walker(3);
}

function draw() {
	w.walk();
	w.display();
}