class Phrase {
    constructor(p) {
      this.phrase = p;
      this.fitness = 0;
  
      // if we know an index is correct (if it increased our fitness) 
      // then we lock it from being mutated
      this.locked = [];
    }
  
    // if character is inside target phrase then increment fitness by 1
    calculateFitness() {
      this.fitness = 0;
  
      this.phrase.split("").forEach((char, i) => {
        if (TARGET_PHRASE[i] == char) {
          this.fitness++;
  
          // if this lock doesn't exist, go ahead and add it
          if (!this.locked.includes(i)) {
            this.locked.push(i);
          }
        }
      })
    }
  
    // select the best of both; then randomly select the rest
    crossOver(other) {
      // build new phrase while keeping correct values in place
      let phrase = "";
      for (let i = 0; i < TARGET_PHRASE.length; i++) {
        if (this.locked.includes(i)) {
          phrase += this.phrase[i];
          continue;
        } else if (other.locked.includes(i)) {
          phrase += other.phrase[i];
          continue;
        }
  
        // if the current index has not been locked by either parent
        // randomly select a parent to use.
        phrase += random() > 0.5 ? this.phrase[i] : other.phrase[i]
      }
      return new Phrase(phrase);
    }
  
    mutate() {
      // go over each character with a chance to change it into something random
      this.phrase.split("").forEach(character => {
        if (random() < MUTATION_RATE) {
          // random index in our string to mutate
          let chosen_index = floor(random(TARGET_PHRASE.length));
  
          // if the index is already "locked" then dont mutate.
          if (!this.locked.includes(chosen_index)) {
  
            // working with strings is ugly
            let p1 = this.phrase.substring(0, chosen_index);
            let p2 = this.phrase.substring(chosen_index, this.phrase.length);
  
            p2 = p2.split("");
            p2[0] = getRandomCharacter();
            p2 = p2.join("");
  
            this.phrase = p1.concat(p2);
          }
        }
      })
    }
  }