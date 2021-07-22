/* global describe, expect, test, jest */

const { caseOf } = require('../../src/core');
const Maybe = require('../../src/maybe');


describe('Core.caseOf', () => {
  test('It should dynamically dispatch to the "caseOf" function of the instance.', () => {
    const just = Maybe.Just(1);

    const onNothing = jest.fn();
    const onJust = jest.fn();

    caseOf({
      Nothing: onNothing,
      Just: onJust,
    }, just);

    expect(onJust).toHaveBeenCalledWith(1);
    expect(onNothing).not.toHaveBeenCalled();
  });
});
