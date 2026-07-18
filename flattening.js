let arrays = [[1, 2, 3], [4, 5], [6]];

let joinedArrays = arrays.reduce((accumulator, currentArray) => {
  return accumulator.concat(currentArray);
}, []);

console.log(joinedArrays);
// → [1, 2, 3, 4, 5, 6]
