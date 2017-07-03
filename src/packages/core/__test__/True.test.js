/* global describe, test, expect */
import True from '../True';

describe('Core.True', () => {
  test('It should always return "true"', () => {
    expect(True()).toBe(true);

    expect(True('wut?')).toBe(true);
  });
});
