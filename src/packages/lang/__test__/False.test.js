/* global describe, test, expect */
import False from '../False';

describe('Zoom.Lang.False', () => {
  test('It should always return "false"', () => {
    expect(False()).toBe(false);

    expect(False('wut?')).toBe(false);
  });
});
