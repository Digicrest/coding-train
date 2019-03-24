class Walker {
	constructor(speed) {
		this.x = width / 2;
		this.y = height / 2;
		this.speed = speed;
	}
	
	walk() {
		let direction = Math.floor(Math.random() * 4 + 1);
		
		switch(direction) {
			case 1: this.y -= this.speed; break; // UP
			case 2: this.y += this.speed; break; // DOWN
			case 3: this.x -= this.speed; break; // LEFT
			case 4: this.x += this.speed; break; // RIGHT
		}
	}
	
	display() {
		ellipse(this.x, this.y, 2, 2)
	}
}