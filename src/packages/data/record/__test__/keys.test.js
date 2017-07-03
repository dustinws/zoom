/* global describe, expect, test */
import keys from '../keys';

describe('Zoom.Data.Record.keys', () => {
  test('it should return the objects enumberable keys as an array of strings', () => {
    expect(keys({ a: 1 })).toEqual(['a']);
  });
});
