/* global describe, expect, test */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.toTask', () => {
    test('It should return a resolved task if the Either is Right', () => {
      const task = Either.toTask(Either.Right(1));

      task.fork(
        () => { throw Error('This should fail the test if executed.'); },
        a => expect(a).toBe(1),
      );
    });

    test('It should return a rejected teask if the Either is Left', () => {
      const task = Either.toTask(Either.Left(1));

      task.fork(
        a => expect(a).toBe(1),
        () => { throw Error('This should fail the test if executed.'); },
      );
    });
  });

  describe('Either#toTask', () => {
    test('It should return a resolved task if the instance is a Right', () => {
      const task = Either.Right.of(1).toTask();

      task.fork(
        () => { throw Error('This should fail the test if executed.'); },
        a => expect(a).toBe(1),
      );
    });

    test('It should return a rejected task if the instance is a Left', () => {
      const task = Either.Left.of(1).toTask();

      task.fork(
        a => expect(a).toBe(1),
        () => { throw Error('This should fail the test if executed.'); },
      );
    });
  });
});
