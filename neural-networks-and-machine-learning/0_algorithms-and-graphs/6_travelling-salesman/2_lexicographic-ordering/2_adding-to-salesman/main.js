const factorial = n => n ? n * factorial(n - 1) : 1;
const random_city = () => floor(random(cities.length));

const NUM_OF_POINTS = 6;
const POSSIBLE_PATHS = factorial(NUM_OF_POINTS);

let cities = [];
let shortest = {};
let evaluated = 0;

let order = [];

function setup() {
  createCanvas(600, 600);
  // frameRate(5)
  for (let i = 0; i < NUM_OF_POINTS; i++) {
    let v = createVector(random(width - 60) + 30, random(height - 230) + 130)
    cities[i] = v;
    order[i] = i;
  }

  shortest.distance = calcDistance(cities);
  shortest.path = cities.splice();
  shortest.order = order.splice();
}

function draw() {
  background(25);
  noFill();
  stroke(255);
  rect(25, 110, width - 50, height - 180);
  fill(255);


  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }

  swap(cities, random_city(), random_city())

  let distance = calcDistance(cities);
  if (distance < shortest.distance) {
    shortest.distance = distance;
    shortest.path = cities.slice();
    shortest.order = order.slice();
  }

  showPaths();
  nextOrder();
  
  evaluated++;
  
  if (evaluated > POSSIBLE_PATHS) {
    console.log("finished");
    noLoop();
  }
}

function calcDistance(points) {
  let total_distance = 0;

  for (let i = 0; i < order.length - 1; i++) {
    let cityA = points[order[i]];
    let cityB = points[order[i + 1]];
    
    let dist = cityA.dist(cityB);
    
    total_distance += dist;
  }

  return total_distance;
}

function showPaths() {
  // Draw Best Path
  stroke(100, 255, 150);
  strokeWeight(4)
  noFill()
  beginShape();
  for (let i = 0; i < shortest.order.length; i++) {
    let n = shortest.order[i];
    vertex(shortest.path[n].x, shortest.path[n].y)
  }
  endShape();

  // Draw Current Path
  stroke(255, 255, 255);
  strokeWeight(1)
  noFill()
  beginShape();
  for (let i = 0; i < order.length; i++) {
    let n = order[i];
    vertex(cities[n].x, cities[n].y)
  }
  endShape();

  // Text
  textSize(24);
  stroke(120);
  fill(255);

  let completion = round(evaluated / POSSIBLE_PATHS * 100);

  text(`Completion: ${evaluated} / ${POSSIBLE_PATHS} ( ${completion}% )`, width / 25, height / 10);

  fill(100, 255, 150);
  text(`Best Distance: ${round(shortest.distance)}`, width / 25, height / 7)
}

// Lexical Ordering
function nextOrder() {
  let largestX = -1;
  for (let i = 0; i < order.length; i++) {
    if (order[i] < order[i + 1]) {
      largestX = i;
    }
  }

  let largestY = -1;
  for (let i = 0; i < order.length; i++) {
    if (order[largestX] < order[i]) {
      largestY = i;
    }
  }
  
  if (largestY == -1 || largestX == -1) {
    noLoop();
  }
  
  swap(order, largestX, largestY);

  let endArray = order.splice(largestX + 1);
  endArray.reverse();
  order.push(...endArray)

  showOrder(order);
}

function showOrder(arr) {
  fill(255);
  noStroke();
  textSize(18);

  let s = '';

  text("Current Order: " + arr.join(" | "), width / 25, height - 40);
  fill(100, 255, 150);

  text("Best Order: " + shortest.order.join(" | "), width / 25, height - 20);
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}