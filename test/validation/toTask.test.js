/* global describe, expect, test, jest */

const Validation = require('../../src/validation');


describe('Data.Validation', () => {
  describe('Validation.toTask', () => {
    test('It should return a resolved task if the Validation is a Success', () => {
      const task = Validation.toTask(Validation.Success());
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the Validation is a Failure', () => {
      const task = Validation.toTask(Validation.Failure());
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });

  describe('Validation#toTask', () => {
    test('It should return a resolved task if the instance is a Success', () => {
      const task = Validation.Success.of().toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the instance is a Failure', () => {
      const task = Validation.Failure.of().toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });
});
