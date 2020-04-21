/* global describe, expect, test, jest */

const Result = require('../../src/result');


describe('Data.Result', () => {
  describe('Result.toTask', () => {
    test('It should return a resolved task if the Result is Ok', () => {
      const task = Result.toTask(Result.Ok());
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the Result is an Err', () => {
      const task = Result.toTask(Result.Err());
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });

  describe('Result#toTask', () => {
    test('It should return a resolved task if the instance is an Ok', () => {
      const task = Result.Ok.of().toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).not.toHaveBeenCalled();
      expect(resolvedCallback).toHaveBeenCalled();
    });

    test('It should return a rejected task if the instance is an Err', () => {
      const task = Result.Err.of().toTask();
      const rejectedCallback = jest.fn();
      const resolvedCallback = jest.fn();

      task.fork(rejectedCallback, resolvedCallback);

      expect(rejectedCallback).toHaveBeenCalled();
      expect(resolvedCallback).not.toHaveBeenCalled();
    });
  });
});
