/* global describe, expect, test */
const constant = require('../constant');

describe('lambda.constant(value)', () => {
  test('It should return a function', () => {
    expect(typeof constant(1)).toBe('function');
  });

  test('The returned function should always return the initial value', () => {
    expect(constant(1)()).toBe(1);
  });
});
