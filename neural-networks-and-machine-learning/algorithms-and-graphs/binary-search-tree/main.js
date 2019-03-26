let tree;

function setup() {
    createCanvas(600, 400)
    tree = new Tree();

    tree.add(12);

    for (let i = 0; i < 25; i++) {
        tree.add(floor(random(15, 25) + 1));
    }
    
    tree.traverse();
	console.log(tree.search(25))
    console.log(tree)

}

function draw() {
    background(255)
}