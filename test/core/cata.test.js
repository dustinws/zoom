/* global describe, expect, test, jest */

const { cata } = require('../../src/core');
const Maybe = require('../../src/maybe');


describe('Core.cata', () => {
  test('It should dynamically dispatch to the "cata" function of the instance.', () => {
    const just = Maybe.Just(1);

    const onNothing = jest.fn();
    const onJust = jest.fn();

    cata({
      Nothing: onNothing,
      Just: onJust,
    }, just);

    expect(onJust).toHaveBeenCalledWith(1);
    expect(onNothing).not.toHaveBeenCalled();
  });
});
