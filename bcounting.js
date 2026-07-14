function countChar(string, char) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      count++;
    }
  }
  return count;
}

function countBs(string) {
  return countChar(string, "B");
}

console.log(countBs("BOB0BBB")); // → 2
console.log(countChar("kakkerlak", "k")); // → 4
