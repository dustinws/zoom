/* global describe, expect, test */

import { add, multiply } from 'ramda';
import * as functor from 'fantasy-land/laws/functor';
import * as setoid from 'fantasy-land/laws/setoid';

import Tuple from '../../../src/tuple';

// Tuple EQ checks === for both values.
const eq = (a, b) =>
  a.left === b.left && a.right === b.right;

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Tuple', () => {
  test('Functor', () => {
    const identity = functor.identity(x => Tuple(0, x))(eq)(VAL);
    const composition =
      functor.composition(x => Tuple(0, x))(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Setoid', () => {
    const reflexivity = setoid.reflexivity(Tuple)(eq)(VAL);
    const symmetry = setoid.symmetry(Tuple)(eq)(VAL);
    const transitivity = setoid.transitivity(Tuple)(eq)(VAL);

    expect(reflexivity).toBe(true);
    expect(symmetry).toBe(true);
    expect(transitivity).toBe(true);
  });
});
