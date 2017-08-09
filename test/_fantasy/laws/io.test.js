/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import IO from '../../../src/io';

// IO EQ checks === for both return values.
const eq = (a, b) =>
  a.run() === b.run();

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - IO', () => {
  test('Functor', () => {
    const identity = functor.identity(IO.of)(eq)(VAL);
    const composition =
      functor.composition(IO.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(IO)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(IO)(eq)(VAL);
    const homomorphism = applicative.homomorphism(IO)(eq)(VAL);
    const interchange = applicative.interchange(IO)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(IO)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(IO.of, add(1));

    const leftIdentity = monad.leftIdentity(IO)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(IO)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
