function fetchImage() {
    fetch('./テイルモン.png')
        .then(response => response.blob())
        .then(blob => document.getElementById('image1').src = URL.createObjectURL(blob))
        .catch(err => {
            console.err(err)
        })
}

async function fetchImageAsync() {
    const response = await fetch('./テイルモン.png');
    const blob = await response.blob();

    document.getElementById('image2').src = URL.createObjectURL(blob);
}