// take the previous curve
// tile it
//  2. rotate top left and top right
//  3. connect them

let order = 2;
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
    let points = [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0 }
    ]

    let index = i & 3;
    let v = points[index]
    
    i = i >> 2;
    index = i & 3

    let len = order

    if (index === 0) {
    } else if (index === 1) {
        v.y += len
    } else if (index === 2) {
        v.x += len
        v.y += len
    } else if (index === 3) {
        v.x += len
    }

    return v
}

function draw(context) {
    // Draw Lines of Curve
    context.beginPath()
    context.strokeStyle='#FFF'
    for (let i = 0; i < path.length - 1; i++) {
        context.moveTo(path[i].x, path[i].y)
        context.lineTo(path[i + 1].x, path[i + 1].y)
        context.stroke()
    }
    context.closePath()
    

    // Draw Points for Vertices
    context.beginPath()
    for (let i = 0; i < path.length; i++) {
        context.fillStyle='#0F0'
        context.fillRect(path[i].x - 2.5, path[i].y -2.5, 5, 5)

        context.fillStyle='#FFF'
        context.fillText(i, path[i].x - 10, path[i].y- 5, 10)
        
        context.stroke()
    }
    context.closePath()
}



