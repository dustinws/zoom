/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import RemoteData from '../../../src/remote-data';

// RemoteData EQ checks === for both return values.
const eq = (a, b) =>
  a.value === b.value;

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - RemoteData', () => {
  test('Functor', () => {
    const identity = functor.identity(RemoteData.of)(eq)(VAL);
    const composition =
      functor.composition(RemoteData.of)(eq)(add(1))(multiply(10))(VAL);

    expect(identity).toBe(true);
    expect(composition).toBe(true);
  });

  test('Apply', () => {
    const composition = apply.composition(RemoteData)(eq)(VAL);

    expect(composition).toBe(true);
  });

  test('Applicative', () => {
    const identity = applicative.identity(RemoteData)(eq)(VAL);
    const homomorphism = applicative.homomorphism(RemoteData)(eq)(VAL);
    const interchange = applicative.interchange(RemoteData)(eq)(VAL);

    expect(identity).toBe(true);
    expect(homomorphism).toBe(true);
    expect(interchange).toBe(true);
  });

  test('Chain', () => {
    const associativity = chain.associativity(RemoteData)(eq)(VAL);

    expect(associativity).toBe(true);
  });

  test('Monad', () => {
    const liftedAdd = compose(RemoteData.of, add(1));

    const leftIdentity = monad.leftIdentity(RemoteData)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(RemoteData)(eq)(VAL);

    expect(leftIdentity).toBe(true);
    expect(rightIdentity).toBe(true);
  });
});
