import { getRandomId, getPairs, getUniquePairs, probabilityBothInSubset } from './helpers';

describe('getRandomId', () => {
  it('should return a string', () => {
    const id = getRandomId();
    expect(typeof id).toBe('string');
  });

  it('should return a non-empty string', () => {
    const id = getRandomId();
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate unique IDs', () => {
    const id1 = getRandomId();
    const id2 = getRandomId();
    const id3 = getRandomId();

    // While technically possible for random IDs to collide, it's extremely unlikely
    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });

  it('should only contain alphanumeric characters', () => {
    const id = getRandomId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});

describe('getPairs', () => {
  it('should return an empty array when both arrays are empty', () => {
    const result = getPairs([], []);
    expect(result).toEqual([]);
  });

  it('should return an empty array when first array is empty', () => {
    const result = getPairs([], [1, 2, 3]);
    expect(result).toEqual([]);
  });

  it('should return an empty array when second array is empty', () => {
    const result = getPairs([1, 2, 3], []);
    expect(result).toEqual([]);
  });

  it('should generate all pairs from two arrays', () => {
    const array1 = [1, 2];
    const array2 = ['a', 'b'];
    const result = getPairs(array1, array2);

    expect(result).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('should handle arrays of different lengths', () => {
    const array1 = [1, 2, 3];
    const array2 = ['x'];
    const result = getPairs(array1, array2);

    expect(result).toEqual([
      [1, 'x'],
      [2, 'x'],
      [3, 'x'],
    ]);
  });

  it('should work with objects', () => {
    const array1 = [{ id: 1 }, { id: 2 }];
    const array2 = [{ name: 'Alice' }];
    const result = getPairs(array1, array2);

    expect(result).toEqual([
      [{ id: 1 }, { name: 'Alice' }],
      [{ id: 2 }, { name: 'Alice' }],
    ]);
  });

  it('should generate the correct number of pairs', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = ['a', 'b', 'c'];
    const result = getPairs(array1, array2);

    // Should generate 4 * 3 = 12 pairs
    expect(result.length).toBe(12);
  });
});

describe('getUniquePairs', () => {
  it('should return an empty array for an empty array', () => {
    const result = getUniquePairs([]);
    expect(result).toEqual([]);
  });

  it('should return an empty array for an array with one element', () => {
    const result = getUniquePairs([1]);
    expect(result).toEqual([]);
  });

  it('should return one pair for an array with two elements', () => {
    const result = getUniquePairs([1, 2]);
    expect(result).toEqual([[1, 2]]);
  });

  it('should generate all unique pairs from an array', () => {
    const array = [1, 2, 3];
    const result = getUniquePairs(array);

    expect(result).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });

  it('should work with strings', () => {
    const array = ['a', 'b', 'c', 'd'];
    const result = getUniquePairs(array);

    expect(result).toEqual([
      ['a', 'b'],
      ['a', 'c'],
      ['a', 'd'],
      ['b', 'c'],
      ['b', 'd'],
      ['c', 'd'],
    ]);
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array = [obj1, obj2, obj3];
    const result = getUniquePairs(array);

    expect(result).toEqual([
      [obj1, obj2],
      [obj1, obj3],
      [obj2, obj3],
    ]);
  });

  it('should generate the correct number of unique pairs', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getUniquePairs(array);

    // For n elements, should generate n * (n - 1) / 2 pairs
    // For 5 elements: 5 * 4 / 2 = 10 pairs
    expect(result.length).toBe(10);
  });

  it('should not include duplicate pairs', () => {
    const array = [1, 2, 3];
    const result = getUniquePairs(array);

    // Check that [2, 1] is not in the result (only [1, 2] should be)
    const hasReverseDuplicate = result.some(
      ([a, b]) => result.some(([c, d]) => a === d && b === c && (a !== c || b !== d))
    );

    expect(hasReverseDuplicate).toBe(false);
  });

  it('should maintain order (first element always has lower index)', () => {
    const array = [10, 20, 30, 40];
    const result = getUniquePairs(array);

    result.forEach(([first, second]) => {
      const firstIndex = array.indexOf(first);
      const secondIndex = array.indexOf(second);
      expect(firstIndex).toBeLessThan(secondIndex);
    });
  });
});

describe('probabilityBothInSubset', () => {
  it('should return 0 when k < 2', () => {
    expect(probabilityBothInSubset(10, 0)).toBe(0);
    expect(probabilityBothInSubset(10, 1)).toBe(0);
  });

  it('should return 0 when k > n', () => {
    expect(probabilityBothInSubset(5, 10)).toBe(0);
  });

  it('should return 1 when k = n and n >= 2', () => {
    // If we select all elements, both elements are definitely in the subset
    expect(probabilityBothInSubset(5, 5)).toBeCloseTo(1, 10);
    expect(probabilityBothInSubset(10, 10)).toBeCloseTo(1, 10);
  });

  it('should return correct probability for k = 2 and n = 2', () => {
    // If we have 2 elements and select 2, both are definitely selected
    expect(probabilityBothInSubset(2, 2)).toBeCloseTo(1, 10);
  });

  it('should calculate correct probability for small values', () => {
    // n = 4, k = 2
    // Total ways to choose 2 from 4: C(4,2) = 6
    // Ways to choose both specific elements: C(2,0) = 1
    // Probability = 1/6 ≈ 0.1667
    expect(probabilityBothInSubset(4, 2)).toBeCloseTo(1 / 6, 4);
  });

  it('should calculate correct probability for n=10, k=5', () => {
    // n = 10, k = 5
    // Total ways: C(10,5) = 252
    // Favorable ways: C(8,3) = 56
    // Probability = 56/252 = 2/9 ≈ 0.2222
    expect(probabilityBothInSubset(10, 5)).toBeCloseTo(2 / 9, 4);
  });

  it('should calculate probability for n=100, k=50', () => {
    // This is a larger test case to verify it handles larger numbers
    // Expected probability: C(98,48) / C(100,50) ≈ 0.2475
    const result = probabilityBothInSubset(100, 50);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
    expect(result).toBeCloseTo(0.2475, 2);
  });

  it('should return a probability between 0 and 1', () => {
    const testCases = [
      [10, 2],
      [10, 5],
      [10, 8],
      [20, 10],
      [50, 25],
    ];

    testCases.forEach(([n, k]) => {
      const result = probabilityBothInSubset(n, k);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(1);
    });
  });

  it('should increase probability as k increases', () => {
    // For a fixed n, as k increases, the probability should increase
    const n = 20;
    const prob1 = probabilityBothInSubset(n, 5);
    const prob2 = probabilityBothInSubset(n, 10);
    const prob3 = probabilityBothInSubset(n, 15);

    expect(prob2).toBeGreaterThan(prob1);
    expect(prob3).toBeGreaterThan(prob2);
  });

  it('should handle edge case where k = n - 1', () => {
    // If we select all but one element, probability should be high
    const n = 10;
    const k = 9;
    const result = probabilityBothInSubset(n, k);

    // C(8,7) / C(10,9) = 8/10 = 0.8
    expect(result).toBeCloseTo(0.8, 4);
  });

  it('should work with large numbers without overflow', () => {
    // Test with large n and k to ensure logarithm approach prevents overflow
    const result = probabilityBothInSubset(1000, 500);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
    expect(Number.isFinite(result)).toBe(true);
  });

  it('should calculate probability for draft scenario (360 cards, 120 in pool)', () => {
    // Real-world scenario: 360-card cube, 120 cards in draft pool
    // This tests a practical Commander Cube use case
    const cubeSize = 360;
    const draftPoolSize = 120;
    const result = probabilityBothInSubset(cubeSize, draftPoolSize);

    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
    // Approximately 11% chance both Partner With cards are in the pool
    expect(result).toBeCloseTo(0.11, 2);
  });
});
