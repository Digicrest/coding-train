let mobilenet;
let check_image;

function setup() {
    createCanvas(400, 300);
    background(0)

    mobilenet = ml5.imageClassifier('MobileNet', modelReady)
}

function modelReady() {
    check_image = createImg('./images/puffin.jpg', imageReady);
    check_image.hide()
}

function imageReady() {
    image(check_image, 0, 0, width, height)

    mobilenet.predict(check_image, (error, results) => {
        if (error) {
            console.error(error)
        } else {
            console.log(results)

            textSize(32)
            stroke(255)
            fill(50, 50, 255)
            text(results[0].label.toUpperCase(), width / 4, height - 10)
            text(Math.floor(results[0].confidence * 100) + '%', width/4, height - 70)
        }
    })
}