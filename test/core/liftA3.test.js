/* global describe, expect, test */

import { liftA3 } from '../../src/core';
import { Just, Nothing } from '../../src/maybe';


describe('Core.liftA3', () => {
  test('It should extract the values from the monads and call the funciton with them.', () => {
    const add3 = (a, b, c) => a + b + c;

    expect(liftA3(add3, Nothing, Nothing, Nothing)).toEqual(Nothing);
    expect(liftA3(add3, Just(1), Nothing, Nothing)).toEqual(Nothing);
    expect(liftA3(add3, Nothing, Just(1), Nothing)).toEqual(Nothing);
    expect(liftA3(add3, Nothing, Nothing, Just(1))).toEqual(Nothing);

    expect(liftA3(add3, Just(1), Just(1), Just(1))).toEqual(Just(3));
  });
});
