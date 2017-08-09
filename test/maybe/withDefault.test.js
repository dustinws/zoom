/* global describe, expect, test */

import Maybe from '../../src/maybe';

describe('Data.Maybe', () => {
  describe('Maybe.withDefault', () => {
    test('It should return the default if the instance is Nothing', () => {
      expect(Maybe.withDefault('foo', Maybe.Nothing)).toBe('foo');
    });

    test('It should return the value if the instance is a Just', () => {
      expect(Maybe.withDefault('foo', Maybe.Just('bar'))).toBe('bar');
    });
  });

  describe('Maybe#withDefault', () => {
    test('It should return the default if the instance is Nothing', () => {
      expect(Maybe.Nothing.withDefault('foo')).toBe('foo');
    });

    test('It should return the default if the instance is Nothing', () => {
      expect(Maybe.Just('bar').withDefault('foo')).toBe('bar');
    });
  });
});
