const TARGET_PHRASE = `To be or not to be!`;

const POPULATION_SIZE = 1000;
const MUTATION_RATE = 1;

let population;

function setup() {
  createCanvas(400, 400);
  population = [];

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let random_phrase = "";
    for (let j = 0; j < TARGET_PHRASE.length; j++) {
      random_phrase += getRandomCharacter();
    }
    population.push(new Phrase(random_phrase));

    ui_best = population[0]
  }
}

function draw() {
  background(255);

  // Work out fitness for each element of a population
  population.forEach(phrase => {
    phrase.calculateFitness();

    // if this has the best fitness so far, update best
    if (phrase.fitness > ui_best.fitness) {
      ui_best = phrase;
    }

    // 100% Fitness - We reached our goal.
    if (phrase.phrase == TARGET_PHRASE) {
      console.log("finished")
      noLoop();
    }
  });

  showGUI();

  // create a new population / generation based on 
  // the fitness of each member in the existing population
  population = newGeneration();
}

// Accept / Reject
function getParents() {
  let parents = [];

  while (parents.length < 2) {
    let random_member = population[floor(random(population.length - 1))];
    
    if (random(TARGET_PHRASE.length) < random_member.fitness) {
      parents.push(random_member);
    }   
  }
  
  return parents;
}

function newGeneration() {
  let children = [];
  
  for (let i = 0; i < POPULATION_SIZE; i++) {
    let [mother, father] = getParents();
    let child = mother.crossOver(father);

    // set child locks to the same as both parents
    child.locked = Array.from(new Set(mother.locked.concat(father.locked)));

    // inherit all correct values and occasionally mutate an incorrect value
    child.mutate();
    children.push(child);
  }

  ui_population = population.length;
  ui_generation_number++;

  return children;
}

function getRandomCharacter() {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789!;".split("");
  let random_index = floor(random(possible.length));

  return possible[random_index];
}