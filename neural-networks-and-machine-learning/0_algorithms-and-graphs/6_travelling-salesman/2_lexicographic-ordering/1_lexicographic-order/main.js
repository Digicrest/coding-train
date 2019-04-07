const values = ["a", "b", "c", "d", "e", "f"];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(130);

  // STEP 1
  // Find highest index where value is lower than next element
  let largestX = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[i] < values[i + 1]) {
      largestX = i;
    }
  }

  // STEP 2
  // Find highest index where value is lower than largestX
  let largestY = -1;
  for (let i = 0; i < values.length; i++) {
    if (values[largestX] < values[i]) {
      largestY = i;
    }
  }

  if (largestY == -1 || largestX == -1) {
    noLoop();
  }

  // STEP 3
  swap(values, largestX, largestY);

  // STEP 4
  // Reverse from largestX + 1 to the end
  let endArray = values.splice(largestX + 1);
  endArray.reverse();
  values.push(...endArray)
  
  render(values);
}

function render(arr) {
  textSize(64);
  let s = '';
  
  for (let i = 0; i < arr.length; i++) {
    s += arr[i];
  }
  fill(255);
  text(s, 100, height/2);
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}