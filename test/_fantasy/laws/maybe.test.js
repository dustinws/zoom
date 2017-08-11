/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Maybe from '../../../src/maybe';

// Maybe EQ checks === for both return values.
const eq = (a, b) =>
  a.value === b.value;

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Maybe', () => {
  test('Functor', () => {
    const identity = functor.identity(Maybe.of)(eq)(VAL);
    const composition =
      functor.composition(Maybe.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(Maybe)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(Maybe)(eq)(VAL);
    const homomorphism = applicative.homomorphism(Maybe)(eq)(VAL);
    const interchange = applicative.interchange(Maybe)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(Maybe)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(Maybe.of, add(1));

    const leftIdentity = monad.leftIdentity(Maybe)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(Maybe)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});