let ui_generation_number = 0;
let ui_average_fitness = 0;
let ui_population = 0;
let ui_best = null;

const ui_normalize = num => round(num / TARGET_PHRASE.length * 100);

function showGUI() {
  // Green
  fill(20, 80, 20, 50)
  rect(width / 10 - 15, 30, 150, 95)
  fill(0);

  // Green Data
  text(`Generation:     #${ui_generation_number}`, width / 10, 50);
  text(`Population:      ${ui_population}`, width / 10, 70);
  text(`Average Fitness: ${ui_average_fitness}%`, width / 10, 90);
  text(`Mutation Rate:   ${MUTATION_RATE * 100}%`, width / 10, 110);
  ui_average_fitness = ui_normalize(population.reduce((sum, phrase) => sum += phrase.fitness, 0) / population.length);


  // Yellow
  fill(255, 233, 100, 50)
  rect(width / 2 - 10, 30, 180, 95)
  fill(0);

  // Yellow Data
  text(ui_normalize(ui_best.fitness) + "%", width / 2, 50)
  text(ui_best.phrase, width / 2, 75);

  if (ui_best.fitness == TARGET_PHRASE.length) {
    text("FINISHED", width / 2 + 50, 50);
  }

  // Red
  fill(255, 100, 100, 50)
  rect(width / 10 - 15, 140, width / 1.2 + 11, height / 2)
  fill(0);

  // Red Data
  for (let i = 0; i < 9; i++) {
    text(population[i].phrase, width / 10, height / 2 - 35 + (i * 20));
  }
}