/* global describe, expect, test */

import { deepEqual } from 'assert';
import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Writer from '../../../src/writer';

// Writer EQ checks === for both return values.
const eq = (a, b) => {
  try {
    deepEqual(a.value, b.value);
    return true;
  } catch (e) {
    return false;
  }
};

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Writer', () => {
  test('Functor', () => {
    const identity = functor.identity(Writer.of)(eq)(VAL);
    const composition =
      functor.composition(Writer.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(Writer)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(Writer)(eq)(VAL);
    const homomorphism = applicative.homomorphism(Writer)(eq)(VAL);
    const interchange = applicative.interchange(Writer)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(Writer)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(Writer.of, add(1));

    const leftIdentity = monad.leftIdentity(Writer)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(Writer)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
