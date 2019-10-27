
const collatz = n => {
    const history = []

    do {
        history.push(n)
        n = n % 2 === 0 ? n / 2 : n * 3 + 1;
    } while(n > 1)

    history.push(n)
    
    return history;
}


const draw = () => {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')


    for (let i = 0; i < 100; i++) {
        let history = collatz(i)
        context.moveTo(0, 0)
        for (let j = 0; j < history.length - 1; j++) {
            const point = history[j];
            const next = history[j + 1];
            context.lineTo(point, next);
            context.stroke();
        }
    
      

      
    }

    // console.log('finished')
}


window.addEventListener('DOMContentLoaded',  draw)