// take the previous curve
// tile it
//  2. rotate top left and top right
//  3. connect them

let order = 1;
let N = Math.pow(2, order)
let total = N * N
let path = new Array(total).fill([])

const report = () => {
    console.log(`================== ORDER ${order} ==================`)
    console.log('N:', N)
    console.log('Total: ', total)
    console.log('Path: ', path)
    console.log(`=============================================`)
}

const mult = (arr, n) => arr.map(i => i * n)
const add = (arr, n) => arr.map(i => i + n)

window.addEventListener('load', () => {
    report()
    setup()
})


function setup() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    // Draw the Background
    context.fillStyle='#000'; 
    context.fillRect(0, 0, 512, 512)

    // Redraw the canvas 
    setInterval(() => draw(context), 2000);

    for (let i = 0; i < total; i++) {
        path[i] = hilbert(i)
        let lineLength = canvas.width / N / 2
        path[i] = mult(path[i], lineLength)
        path[i] = add(path[i], lineLength /2)
    }
}

function hilbert(i) {
    let points = [[0, 0], [0, 1], [1, 1], [1, 0]]
    return points[i]
}

function draw(context) {
    // Draw Lines of Curve
    context.beginPath()
    context.strokeStyle='#FFF'
    for (let i = 0; i < path.length - 1; i++) {
        context.moveTo(path[i][0], path[i][1])
        context.lineTo(path[i + 1][0], path[i + 1][1])
        context.stroke()
    }
    context.closePath()
    

    // Draw Points for Vertices
    context.beginPath()
    for (let i = 0; i < path.length; i++) {
        context.fillStyle='#0F0'
        context.fillRect(path[i][0] - 2.5, path[i][1] -2.5, 5, 5)

        context.fillStyle='#FFF'
        context.fillText(i, path[i][0] - 10, path[i][1] - 5, 10)
        
        context.stroke()
    }
    context.closePath()
}



