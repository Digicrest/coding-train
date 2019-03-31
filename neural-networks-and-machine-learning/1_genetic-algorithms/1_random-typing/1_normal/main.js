const TARGET_PHRASE = `Genetic Algorithms; DOPE!`;
const POPULATION_SIZE = 1000;
const MUTATION_RATE = 0.01;

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

  population.forEach(phrase => {
    phrase.setFitness();

    if (phrase.fitness > ui_best.fitness) {
      ui_best = phrase;
    }

    if (phrase.fitness == TARGET_PHRASE.length) {
      console.log("finished")
      noLoop();
    }
  });

  showGUI();
  population = newGeneration();
}

function newGeneration() {
  let children = [];
  let mating_pool = [];
  
  population.forEach(phrase => {
    for (let i = 0; i <= phrase.fitness; i++) {
      mating_pool.push(phrase);
    }
  })

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let mommy_phrase = mating_pool[floor(random(mating_pool.length - 1))]
    let daddy_phrase = mating_pool[floor(random(mating_pool.length - 1))]

    let child = mommy_phrase.crossOver(daddy_phrase);

    child.mutate();
    children.push(child);
  }

  ui_population = mating_pool.length;
  ui_generation_number++;
  return children;
}

function getRandomCharacter() {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz 0123456789!;".split("");
  let random_index = floor(random(possible.length));

  return possible[random_index];
}