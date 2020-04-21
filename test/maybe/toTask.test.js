/* global describe, expect, test, jest */

const Maybe = require('../../src/maybe');


describe('Data.Maybe', () => {
  describe('Maybe.toTask', () => {
    test('It should return a resolved task if the Maybe is Just', () => {
      const task = Maybe.toTask(Maybe.Just(1));
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected teask if the Maybe is Nothing', () => {
      const task = Maybe.toTask(Maybe.Nothing);
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });

  describe('Maybe#toTask', () => {
    test('It should return a resolved task if the instance is a Just', () => {
      const task = Maybe.Just.of(1).toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the instance is a Nothing', () => {
      const task = Maybe.Nothing.of().toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });
});
