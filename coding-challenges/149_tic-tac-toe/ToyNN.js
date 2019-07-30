import Neuron from './Neuron.js'


const _LEARNING_RATE = 0.1;
const _MAX_ITERATIONS = 1;


const plot_size = {
    width: 600,
    height: 400
};

// arbitrary dividing line for classification
const divider = 250

// randomly plotted coordinates
const training_inputs = new Array(100).fill(0).map(coordinate => {
    return {
        x: Math.round(Math.random() * plot_size.width) + 1,
        y: Math.round(Math.random() * plot_size.height) + 1
    }
});

// assign labels to our trainign data
const labels = training_inputs.map(input => input.y > divider ? 'A' : 'B')

const create_neurons = (n, inputs) => new Array(n).fill(0).map(() => new Neuron(inputs[Math.round(Math.random() * 100)]));

export class ToyNN {
    constructor(inputNodes = 2, hiddenNodes = 2, outputNodes = 1) {
        console.log(this)
        console.log('TARGET: ', labels)

        this.inputs = create_neurons( inputNodes, training_inputs )
        this.hidden = create_neurons( hiddenNodes, this.inputs.map(input => input.output))
        this.outputs = create_neurons( outputNodes, this.hidden.map(hidden => hidden.output))

        this.current_generation = 0;
        for (let i = 0; i < _MAX_ITERATIONS; i++) {
            this.newGeneration(i)
        }
    }

    newGeneration(generation_number) {
        console.log(`============ Generation #${generation_number} ============`)

        // update weights for every input node
        this.inputs.forEach(input => {
            console.log(input.inputs)
            console.log(input.guess())
        })
        // this.inputs.forEach(input => {
        //     input.
        //     const new_weights = input.adjust_weights(labels, _LEARNING_RATE);
        // })

        if (generation_number < _MAX_ITERATIONS) {
            this.current_generation++
        }
    }
}

export default ToyNN;