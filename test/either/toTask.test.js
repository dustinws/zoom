/* global describe, expect, test, jest */

const Either = require('../../src/either');


describe('Data.Either', () => {
  describe('Either.toTask', () => {
    test('It should return a resolved task if the Either is Right', () => {
      const task = Either.toTask(Either.Right(1));
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the Either is Left', () => {
      const task = Either.toTask(Either.Left(1));
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });

  describe('Either#toTask', () => {
    test('It should return a resolved task if the instance is a Right', () => {
      const task = Either.Right.of(1).toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the instance is a Left', () => {
      const task = Either.Left.of(1).toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });
});
