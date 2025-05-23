// Uncomment the code below and write your tests
 import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 8, b: 4, action: Action.Subtract, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 10,b: 2, action: Action.Divide, expected: 5},
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },

    // continue cases for other actions    
]; 

describe('simpleCalculator', () => {
  test.each(testCases)(
    'returns $expected for a: $a, b: $b, action: $action',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  );
});

