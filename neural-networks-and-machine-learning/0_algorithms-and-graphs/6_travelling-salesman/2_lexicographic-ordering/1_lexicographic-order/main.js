const values = ["a", "b", "c"];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

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
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}