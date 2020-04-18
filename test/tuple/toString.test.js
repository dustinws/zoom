/* global describe, expect, test */

const Tuple = require('../../src/tuple');

describe('Data.Tuple', () => {
  test('Tuple#toString()', () => {
    const tuple = Tuple(1, 2);

    expect(tuple.toString()).toBe('(1, 2)');
  });
});
