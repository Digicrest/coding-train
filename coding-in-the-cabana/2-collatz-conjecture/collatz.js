// Collatz Conjecture
// is a number sequence
// n is even ? set to n / 2 else set to n * 3 + 1

// i.e.  5 -> 16 -> 8 -> 4 -> 2 -> 1 -> 4 -> 2 -> 1 ..... 4 -> 2 -> 1
// any positive integer will end up as 1

const collatz = n => {
    if (n === 1) {
        return n;
    }
    
    return collatz(n % 2 === 0 ? n / 2 : n * 3 + 1)
}
