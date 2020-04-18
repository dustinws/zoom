/* global describe, expect, test */

const { liftA4 } = require('../../src/core');
const { Just, Nothing } = require('../../src/maybe');


describe('Core.liftA4', () => {
  test('It should extract the values from the monads and call the funciton with them.', () => {
    const add4 = (a, b, c, d) => a + b + c + d;

    expect(liftA4(add4, Nothing, Nothing, Nothing, Nothing)).toEqual(Nothing);
    expect(liftA4(add4, Just(1), Nothing, Nothing, Nothing)).toEqual(Nothing);
    expect(liftA4(add4, Nothing, Just(1), Nothing, Nothing)).toEqual(Nothing);
    expect(liftA4(add4, Nothing, Nothing, Just(1), Nothing)).toEqual(Nothing);
    expect(liftA4(add4, Nothing, Nothing, Nothing, Just(1))).toEqual(Nothing);

    expect(liftA4(add4, Just(1), Just(1), Just(1), Just(1))).toEqual(Just(4));
  });
});
