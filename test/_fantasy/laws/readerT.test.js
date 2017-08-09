/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Reader from '../../../src/reader';
import Maybe from '../../../src/maybe';

// Reader EQ checks === for both return values.
const eq = (a, b) =>
  a.run().value === b.run().value;

// A costant we can use to check equality.
const VAL = 1;

const ReaderT = Reader.T(Maybe);

describe('Fantasy Laws - ReaderT', () => {
  test('Functor', () => {
    const identity = functor.identity(ReaderT.of)(eq)(VAL);
    const composition =
      functor.composition(ReaderT.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(ReaderT)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(ReaderT)(eq)(VAL);
    const homomorphism = applicative.homomorphism(ReaderT)(eq)(VAL);
    const interchange = applicative.interchange(ReaderT)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(ReaderT)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(ReaderT.of, add(1));

    const leftIdentity = monad.leftIdentity(ReaderT)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(ReaderT)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
