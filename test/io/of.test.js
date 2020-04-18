/* global describe, expect, test */

const IO = require('../../src/io');

describe('IO', () => {
  describe('IO.of', () => {
    test('it should create a new io that will return the given value', () => {
      const io = IO.of('foo');

      expect(io.run()).toBe('foo');
    });
  });

  describe('IO#of', () => {
    test('it should create a new io that will return the given value', () => {
      const io = IO.of().of('foo');

      expect(io.run()).toBe('foo');
    });
  });
});
