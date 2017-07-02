/* global describe, expect, test */
import typeOf from '../typeOf';

describe('core.typeOf', () => {
  test('It should return the [[class]] of an object', () => {
    expect(typeOf('')).toBe('String');
    expect(typeOf([])).toBe('Array');
    expect(typeOf(true)).toBe('Boolean');
    expect(typeOf({})).toBe('Object');
    expect(typeOf(43)).toBe('Number');
    expect(typeOf(new Date())).toBe('Date');
  });
});
