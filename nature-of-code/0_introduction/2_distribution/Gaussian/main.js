let gen;

function setup() {
	createCanvas(800, 600);
	background(255);
}

function draw() {
    let h = randomGaussian();
    h = h * 20;
    h += 200;
    
	fill(100,0,100);
    ellipse(width/2,height/2,h,h)
}