/* global describe, expect, test */
import { union } from '..';

describe('ADT.union', () => {
  test('It should attach the case classes to the returned object', () => {
    const T = union('T', {
      SomeCase: [],
    });

    expect(T.SomeCase).toBeTruthy();
  });

  test('The case classes should be instances of the super class', () => {
    const T = union('T', {
      SomeCase: ['someValue'],
    });

    expect(T.SomeCase() instanceof T).toBeTruthy();
  });

  test('The case class should be eagerly created if it has no params', () => {
    const T = union('T', {
      SomeCase: [],
    });

    expect(T.SomeCase instanceof T).toBeTruthy();
  });

  test('The case class should have a cata method', () => {
    const T = union('T', {
      SomeCase: [],
    });

    expect(typeof T.SomeCase.cata).toBe('function');
  });

  test('The case class\' cata methods should pick the on named after the type and pass in any params', () => {
    const T = union('T', {
      SomeCase: ['a', 'b'],
    });

    return new Promise((resolve) => {
      T.SomeCase(1, 2).cata({
        SomeCase(a, b) {
          expect(a).toBe(1);
          expect(b).toBe(2);
          resolve();
        },
      });
    });
  });
});
