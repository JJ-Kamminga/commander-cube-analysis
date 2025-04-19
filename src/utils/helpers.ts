export const colourOrderStrings = [
  'W', 'U', 'B', 'R', 'G',
  'WU', 'UB', 'BR', 'RG', 'WG', 'WB', 'UR', 'BG', 'WR', 'UG',
  'WUB', 'UBR', 'BRG', 'WRG', 'WUG', 'WBG', 'WUR', 'UBG', 'WBR', 'URG',
  'WUBR', 'UBRG', 'WBRG', 'WURG', 'WUBG',
  'WUBRG',
  'C',
];

export const ciNicknameDictionary: { [key: string]: string } = {
  "W": "White",
  "U": "Blue",
  "B": "Black",
  "R": "Red",
  "G": "Green",
  "WU": "Azorius",
  "WR": "Boros",
  "UB": "Dimir",
  "BG": "Golgari",
  "RG": "Gruul",
  "UR": "Izzet",
  "WB": "Orzhov",
  "BR": "Rakdos",
  "WG": "Selesnya",
  "UG": "Simic",
  "WBG": "Abzan",
  "WUG": "Bant",
  "WUB": "Esper",
  "UBR": "Grixis",
  "WUR": "Jeskai",
  "BRG": "Jund",
  "WBR": "Mardu",
  "WRG": "Naya",
  "UBG": "Sultai",
  "URG": "Temur",
  "WBRG": "4C Blueless",
  "UBRG": "4C Whiteless",
  "WURG": "4C Blackless",
  "WUBG": "4C Redless",
  "WUBR": "4C Greenless",
  "WUBRG": "Five colour",
  "C": "Colourless"
};

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

/** to determine probability of both partner withs being in a draft pool 
 * To calculate the probability that two elements of an array are both part of a random subset of a given size, we can use the principles of combinatorics. Here's the breakdown:

Formula:
Let the array have 
𝑛
n elements.
Let the subset have 
𝑘
k elements.
Let the two specific elements be 
𝑒
1
e 
1
​
  and 
𝑒
2
e 
2
​
 .
The probability that both 
𝑒
1
e 
1
​
  and 
𝑒
2
e 
2
​
  are in the subset is:

𝑃
(
both in subset
)
=
(
𝑛
−
2
𝑘
−
2
)
(
𝑛
𝑘
)
P(both in subset)= 
( 
k
n
​
 )
( 
k−2
n−2
​
 )
​
 
Where:

(
𝑛
𝑘
)
( 
k
n
​
 ) is the number of ways to choose 
𝑘
k elements from 
𝑛
n.
(
𝑛
−
2
𝑘
−
2
)
( 
k−2
n−2
​
 ) is the number of ways to choose 
𝑘
−
2
k−2 elements from the remaining 
𝑛
−
2
n−2 elements after 
𝑒
1
e 
1
​
  and 
𝑒
2
e 
2
​
  are included.

*/
export const probabilityBothInSubset = (n: number, k: number): number => {
  if (k > n || k < 2) {
    return 0; // Not possible to choose a subset of size k with 2 elements if k < 2 or k > n
  }

  // Helper function to calculate log of n choose k (binomial coefficient)
  const logBinomialCoefficient = (n: number, k: number): number => {
    if (k > n) return -Infinity;
    if (k === 0 || k === n) return 0;
    let logResult = 0;
    for (let i = 1; i <= k; i++) {
      logResult += Math.log(n - i + 1) - Math.log(i);
    }
    return logResult;
  };

  // Calculate the probability using logarithms
  const logTotalWays = logBinomialCoefficient(n, k);
  const logFavorableWays = logBinomialCoefficient(n - 2, k - 2);

  return Math.exp(logFavorableWays - logTotalWays);
}
