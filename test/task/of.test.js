/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.of', () => {
    test('It should create a new Task instance', () => {
      expect(Task.of() instanceof Task).toBe(true);
    });
  });

  describe('Task#of', () => {
    test('It should create a new Task instance', () => {
      expect(Task.of().of() instanceof Task).toBe(true);
    });
  });
});
