export default class Neuron {
    constructor(inputs = []) {
        this.inputs = inputs
        this.weights = [0, 0].map(n => random_weight())
        this.bias = Math.random()
    }


    // activate / guess / fire / trigger
    guess = () => {
        const weighted_sum = this.sum_weights();  
        console.log('weighted su', weighted_sum)
        const outputs = sign(weighted_sum) > 0 ? 'A' : 'B'
        console.log('sign(weighted_sum)', sign(weighted_sum))
        console.log('outputs', outputs)
        return outputs
    }


    // sum of all input values multiplied by their corresponding weight value
    sum_weights = () => {
        return this.inputs.x * this.weights[0] + this.inputs.y * this.weights[1] + this.bias
        // return this.inputs
        //     .map((input, i) => input * this.weights[i])
        //     .reduce((sum, val) => sum += val, this.bias)
    }


    // reduce loss / minimize error
    adjust_weights = (labels, learning_rate) => {
        console.log(`--- New Neuron ---`)

        const error = labels.reduce((acc, label) => {
            if (this.output < label || this.output > label) {
                return acc += 1;
            }
            return acc;
        }, 0);

        return this.weights.map(weight => {
            if (error === 0) return weight
            
            const new_weight = sigmoid(weight + error * learning_rate);
            return new_weight
        });
    }    
}

// ACTIVATION FUNCTIONS
const sigmoid = t => 1 / (1 + Math.pow(Math.E, -t))
const sign = t => t > 0 ? 1 : -1

// Helpers
const random_weight = () => Math.random()