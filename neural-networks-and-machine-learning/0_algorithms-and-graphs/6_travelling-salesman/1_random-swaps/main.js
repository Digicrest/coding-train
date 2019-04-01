const fact = n => n ? n * fact(n - 1) : 1;
const random_city = () => floor(random(cities.length));

const NUM_OF_POINTS = 6;
const POSSIBLE_PATHS = fact(NUM_OF_POINTS);

let cities = [];
let shortest_path = [];
let shortest_distance;
let evaluated = 0;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < NUM_OF_POINTS; i++) {
    let v = createVector(random(width - 50) + 25, random(height - 110) + 70)
    cities[i] = v
  }

  shortest_distance = calcDistance(cities);
  shortest_path = cities.splice();
}

function draw() {
  background(25);

  fill(255)
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }

  // Draw Best Path
  stroke(100, 255, 150);
  strokeWeight(4)
  noFill()
  beginShape();
  for (let i = 0; i < shortest_path.length; i++) {
    vertex(shortest_path[i].x, shortest_path[i].y)
  }
  endShape();

  // Draw Current Path
  stroke(255, 255, 255);
  strokeWeight(1)
  noFill()
  beginShape();
  for (let i = 0; i < cities.length; i++) {
    vertex(cities[i].x, cities[i].y)
  }
  endShape();

  swap(cities, random_city(), random_city())

  let distance = calcDistance(cities);
  if (distance < shortest_distance) {
    shortest_distance = distance;
    shortest_path = cities.slice();
  }

  stroke(255);
  strokeWeight(0.5);
  text(`Completion: ${evaluated} / ${POSSIBLE_PATHS} ( ${round(evaluated / POSSIBLE_PATHS * 100)}% )`, width / 10, height / 10)
  text(`Best Distance: ${round(shortest_distance)}`, width / 10, height / 7)
  evaluated++;
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j];
  arr[j] = temp;
}
function calcDistance(points) {
  let total_distance = 0;

  for (let i = 0; i < points.length - 1; i++) {
    let dist = points[i].dist(points[i + 1]);
    total_distance += dist;
  }

  return total_distance;
}