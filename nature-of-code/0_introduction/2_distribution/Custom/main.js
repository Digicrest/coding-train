let arr = [10, 20, 0, 5, 5, 5, 0, 0];

let chosen = {"0":0, "5":0, "10":0, "20": 0};

for(let i = 0; i < 1000000; i++){
   let index = Math.floor(Math.random() * arr.length);
   chosen[arr[index]]++
}

for (const key in chosen) {
    if (chosen.hasOwnProperty(key)) {
        const num = chosen[key];
        console.log(`${key}: ${Math.round(num / 10000)}%`);
    }
}
console.log(chosen)