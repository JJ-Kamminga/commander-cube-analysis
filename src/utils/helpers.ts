export const getRandomId = () => {
  return Math.random().toString(36).substring(2);
}

/** generates an array of all unique pairs, with one element from the first array and one element from the second array */
export const getPairs = <T, U>(array1: T[], array2: U[]): [T, U][] => {
  const pairs: [T, U][] = [];
  for (const item1 of array1) {
    for (const item2 of array2) {
      pairs.push([item1, item2]);
    }
  }
  return pairs;
}

/** return each unique pairing of two objects from an array of objects */
export const getUniquePairs = <T>(array: T[]): [T, T][] => {
  const pairs: [T, T][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      pairs.push([array[i], array[j]]);
    }
  }
  return pairs;
}
