/* global describe, expect, test */

import { liftA2 } from '../../src/core';
import { Just, Nothing } from '../../src/maybe';


describe('Core.liftA2', () => {
  test('It should extract the values from the monads and call the funciton with them.', () => {
    const add2 = (a, b) => a + b;

    expect(liftA2(add2, Nothing, Nothing)).toEqual(Nothing);
    expect(liftA2(add2, Just(1), Nothing)).toEqual(Nothing);
    expect(liftA2(add2, Nothing, Just(1))).toEqual(Nothing);

    expect(liftA2(add2, Just(1), Just(1))).toEqual(Just(2));
  });
});
