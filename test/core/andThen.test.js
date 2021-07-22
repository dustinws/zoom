/* global describe, expect, test, jest */

const { andThen } = require('../../src/core');
const Maybe = require('../../src/maybe');


describe('Core.andThen', () => {
  test('It should dynamically dispatch to the "andThen" function of the instance.', () => {
    const just = Maybe.Just(10);
    const double = jest.fn(x => Maybe.of(x * 2));

    const result = andThen(double, just);

    expect(double).toHaveBeenCalledWith(10);
    expect(result).toEqual(Maybe.of(20));
  });
});
