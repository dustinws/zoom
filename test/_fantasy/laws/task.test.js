/* global describe, expect, test */

import { add, compose, multiply } from 'ramda';
import * as applicative from 'fantasy-land/laws/applicative';
import * as apply from 'fantasy-land/laws/apply';
import * as functor from 'fantasy-land/laws/functor';
import * as chain from 'fantasy-land/laws/chain';
import * as monad from 'fantasy-land/laws/monad';

import Task from '../../../src/task';

// Task EQ checks === for both return values.
const eq = (a, b) =>
  a.chain(aa => b.map(bb => aa === bb));

// A costant we can use to check equality.
const VAL = 1;

describe('Fantasy Laws - Task', () => {
  test('Functor', () => {
    const identity = functor.identity(Task.of)(eq)(VAL);
    const composition =
      functor.composition(Task.of)(eq)(add(1))(multiply(10))(VAL);

    return identity
      .toPromise()
      .then(x => expect(x).toBe(true))

      .then(() => composition.toPromise())
      .then(x => expect(x).toBe(true));
  });

  test('Apply', () => {
    const composition = apply.composition(Task)(eq)(VAL);

    return composition
      .toPromise()
      .then(x => expect(x).toBe(true));
  });

  test('Applicative', () => {
    const identity = applicative.identity(Task)(eq)(VAL);
    const homomorphism = applicative.homomorphism(Task)(eq)(VAL);
    const interchange = applicative.interchange(Task)(eq)(VAL);


    return identity
      .toPromise()
      .then(x => expect(x).toBe(true))

      .then(() => homomorphism.toPromise())
      .then(x => expect(x).toBe(true))

      .then(() => interchange.toPromise())
      .then(x => expect(x).toBe(true));
  });

  test('Chain', () => {
    const associativity = chain.associativity(Task)(eq)(VAL);

    return associativity
      .toPromise()
      .then(x => expect(x).toBe(true));
  });

  test('Monad', () => {
    const liftedAdd = compose(Task.of, add(1));

    const leftIdentity = monad.leftIdentity(Task)(eq)(liftedAdd)(VAL);
    const rightIdentity = monad.rightIdentity(Task)(eq)(VAL);

    return leftIdentity
      .toPromise()
      .then(x => expect(x).toBe(true))

      .then(() => rightIdentity.toPromise())
      .then(x => expect(x).toBe(true));
  });
});
