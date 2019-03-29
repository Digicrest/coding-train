const TARGET_PHRASE = `Genetic Algorithms; DOPE!`;
const POPULATION_SIZE = 50;
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

  // Work out fitness for each element of a population
  population.forEach(phrase => {
    phrase.setFitness();

    // if this has the best fitness so far, update best
    if (phrase.fitness > ui_best.fitness) {
      ui_best = phrase;
    }

    // 100% Fitness - We reached our goal.
    if (phrase.fitness == TARGET_PHRASE.length) {
      console.log("finished")
      noLoop();
    }
  });

  showGUI();

  // create a new population / generation based on 
  // the fitness of each member in the existing population
  population = newGeneration();
}

function newGeneration() {
    let children = [];
  
    // create a mating pool where the fittest individuals appear most often
    // and are therefore more likely to be randomly selected
    let mating_pool = [];
    population.forEach(phrase => {
      for (let i = 0; i <= phrase.fitness; i++) {
        mating_pool.push(phrase);
      }
    })
  
    // create a new population by randomly selecting two phrases 
    // in the mating pool and performing crossover
    for (let i = 0; i < POPULATION_SIZE; i++) {
      let mommy_phrase = mating_pool[floor(random(mating_pool.length - 1))]
      let daddy_phrase = mating_pool[floor(random(mating_pool.length - 1))]
  
      let child = mommy_phrase.crossOver(daddy_phrase);
  
      // set child locks to the same as both parents
      child.locked = Array.from(new Set(mommy_phrase.locked.concat(daddy_phrase.locked)));
  
      // inherit all correct values and occasionally mutate an incorrect value
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