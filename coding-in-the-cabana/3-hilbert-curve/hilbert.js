// 0. take the previous curve
// 1. tile it
//  2. rotate top left and top right
//  3. connect them

let order = 5;
let N = Math.pow(2, order)
let total = N * N
let path = new Array(total).fill([])

const mult = (vector, n) => {
    vector.x *= n
    vector.y *= n
    return vector
 }

 const add = (vector, n) => {
    vector.x += n
    vector.y += n
    return vector
 }

window.addEventListener('load', setup)

function setup() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    context.fillStyle='#000'; 
    context.fillRect(0, 0, 5120, 5120)

    for (let i = 0; i < total; i++) {
        path[i] = hilbert(i)
        let lineLength = canvas.width / N / 2
        path[i] = mult(path[i], lineLength)
        path[i] = add(path[i], lineLength /2)
    }

    setInterval(() => draw(context), 25);
}

let counter = 0;
function draw(context) {
    if (counter > 0 && counter === path.length) {
        setTimeout(() => {
            counter = 0
            context.fillStyle='#000'; 
            context.fillRect(0, 0, 5120, 5120)
        }, 1000)
        return;
    }

    // Draw Lines of Curve
    context.beginPath()
    context.strokeStyle='#FFF'
    for (let i = 0; i < counter; i++) {
        context.moveTo(path[i].x, path[i].y)
        context.lineTo(path[i + 1].x, path[i + 1].y)
        context.stroke()
    }
    context.closePath()
    counter++;
}

function hilbert(i) {
    let points = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 }
    ]

    let index = i & 3;
    let v = points[index]
    

    for (let j = 1; j < order; j++) {
        i = i >> 2;
        index = i & 3

        let len = Math.pow(2, j)
        if (index === 0) {
            let temp = v.x
            v.x = v.y;
            v.y = temp;
        } else if (index === 1) {
            v.y += len
        } else if (index === 2) {
            v.x += len
            v.y += len
        } else if (index === 3) {
            let temp =  len- 1- v.x
            v.x = len-  1 - v.y;
            v.y = temp;
            v.x += len
        }
    }

    return v
}

