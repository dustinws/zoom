/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Validation from '../../../src/validation';

// Validation EQ checks === for both return values.
const eq = (a, b) =>
  a.value === b.value;

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Validation', () => {
  test('Functor', () => {
    const identity = functor.identity(Validation.of)(eq)(VAL);
    const composition =
      functor.composition(Validation.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(Validation)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(Validation)(eq)(VAL);
    const homomorphism = applicative.homomorphism(Validation)(eq)(VAL);
    const interchange = applicative.interchange(Validation)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(Validation)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(Validation.of, add(1));

    const leftIdentity = monad.leftIdentity(Validation)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(Validation)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
