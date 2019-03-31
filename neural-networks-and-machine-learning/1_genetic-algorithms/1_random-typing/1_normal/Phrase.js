class Phrase {
    constructor(p) {
      this.phrase = p;
      this.fitness = 0;
    }
  
    setFitness() {
      this.fitness = 0;
  
      this.phrase.split("").forEach((char, i) => {
        if (TARGET_PHRASE[i] == char) {
          this.fitness++;
        }
      })
    }
  
    crossOver(other) {
      let midpoint = floor(TARGET_PHRASE.length / 2);
      let half_of_me = this.phrase.split("").splice(0, midpoint).join("");
      let half_of_them = other.phrase.split("").splice(midpoint, TARGET_PHRASE.length - 1).join("");
      
      return new Phrase(half_of_me.concat(half_of_them));
    }
  
    mutate() {
      this.phrase.split("").forEach(character => {
        if (random() < MUTATION_RATE) {
          let chosen_index = floor(random(TARGET_PHRASE.length));
            let p1 = this.phrase.substring(0, chosen_index);
            let p2 = this.phrase.substring(chosen_index, this.phrase.length);
  
            p2 = p2.split("");
            p2[0] = getRandomCharacter();
            p2 = p2.join("");
  
            this.phrase = p1.concat(p2);
          }
      })
    }
  }