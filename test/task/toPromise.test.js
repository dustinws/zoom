/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.toPromise', () => {
    test('It should return a valid Promise', () => {
      expect(Task.toPromise(Task.of()) instanceof Promise).toBe(true);
    });
  });

  describe('Task#toPromise', () => {
    test('It should return a valid Promise', () => {
      expect(Task.of().toPromise() instanceof Promise).toBe(true);
    });
  });
});
