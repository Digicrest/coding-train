let tree;

function setup() {
  createCanvas(600, 400);
  background(151);
  
  tree = new Tree();

  tree.add(50);

  for (let i = 0; i < 10; i++) {
    let num = floor(random(1, 100));
    
    if (!tree.search(num))
      tree.add(num);
  }

  tree.traverse();
  tree.search(20)
}