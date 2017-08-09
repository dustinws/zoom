/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Result from '../../../src/result';

// Result EQ checks === for both return values.
const eq = (a, b) =>
  a.value === b.value;

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Result', () => {
  test('Functor', () => {
    const identity = functor.identity(Result.of)(eq)(VAL);
    const composition =
      functor.composition(Result.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(Result)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(Result)(eq)(VAL);
    const homomorphism = applicative.homomorphism(Result)(eq)(VAL);
    const interchange = applicative.interchange(Result)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(Result)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(Result.of, add(1));

    const leftIdentity = monad.leftIdentity(Result)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(Result)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
