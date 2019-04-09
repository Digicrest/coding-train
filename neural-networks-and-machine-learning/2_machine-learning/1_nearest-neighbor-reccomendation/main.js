let data;
let resultP;

function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  createCanvas(400, 400);
  let users = { };
  
  let select1 = createSelect('');
  let select2 = createSelect('');

  data.users.forEach(user => {
    let name = user.name;
    
    select1.option(name);
    select2.option(name);
    
    users[name] = user;
  });
  
  let button = createButton("Submit");
  button.mousePressed(euclideanSimilarity);

  resultP = createP('');
  function euclideanSimilarity() {
    let person1 = users[select1.value()];
    let person2 = users[select2.value()];
    
    delete person1.name
    delete person1.timestamp

    let differences = [];
    
    // Get the rating differences
    Object.keys(person1).forEach(key => {
        let p1_rating = person1[key];
        let p2_rating = person2[key];
      
        if (p1_rating != null && p2_rating != null) {
          differences.push(p1_rating - p2_rating); 
        }
    });
    
    /* 
      1. square the differences
      2. take the sum
      3. square root the result
    */
    let distance = Math.sqrt(differences
      .map(diff => Math.pow(diff, 2))
      .reduce((sum, diff) => sum += diff, 0))
    
    // invert and normalise to 0 ~ 1
    // lower = more similar
    let similarity = Math.round(1 / ( 1 + distance) * 1000) / 1000;
    
    resultP.html(similarity)
    console.log(similarity);
  }
}

function draw() {
  background(220);

}