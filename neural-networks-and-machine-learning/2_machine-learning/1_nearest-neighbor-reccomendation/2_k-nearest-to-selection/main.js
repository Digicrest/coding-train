let data;
let resultP;

function preload() {
  data = loadJSON('movies.json');
}

function setup() {
  createCanvas(400, 400);

  let users = {};
  let selection = createSelect('');

  data.users.forEach(user => {
    selection.option(user.name);
    users[user.name] = user;
  });

  let button = createButton("Submit");
  button.mousePressed(findNearestNeighbors);

  resultP = createP('');

  function findNearestNeighbors() {
    let selected = users[selection.value()];

    Object.keys(users).forEach((username, i) => {
      let user = users[username];

      if (username !== selection.value()) {
        let ratings = getRatings(user, selected);

        let similarity = euclideanSimilarity(ratings[0], ratings[1]);
        user.similarity = similarity;
      } else {
        selected.similarity = -1;
      }
    });
    
    let usersArr = [];
    for(let username in users) {
        usersArr.push(users[username]);
    } 
    usersArr.sort((a, b) => b.similarity - a.similarity);
    usersArr.splice(0, 5).map(u => {
      let div = createDiv(u.name + ", " + u.similarity);
      resultP.parent(div);
    })
  }
}

function draw() {
  background(220);
}

function getRatings(person1, person2) {
  let ratings1 = [];
  let ratings2 = [];

  Object.keys(person1).forEach(key => {
    if (key !== "name" && key !== "timestamp") {
      let rating1 = person1[key];
      let rating2 = person2[key];

      if (rating1 != null && rating2 != null) {
        ratings1.push(rating1);
        ratings2.push(rating2);
      }
    }
  });

  return [ratings1, ratings2]
}

function euclideanSimilarity(v1, v2) {
  let differences = v1.map((num, i) => num - v2[i]);

  let distance = Math.sqrt(differences
    .map(diff => Math.pow(diff, 2))
    .reduce((sum, diff) => sum += diff, 0))

  let similarity = Math.round(1 / (1 + distance) * 1000) / 1000;

  return similarity;
}