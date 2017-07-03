/* global describe, expect, test */
import divide from '../divide';

describe('Zoom.Math.divide', () => {
  test('it should divide two numbers', () => {
    expect(divide(20, 5)).toBe(4);
  });
});
