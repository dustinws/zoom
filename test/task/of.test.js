/* global describe, test, expect */

import Task from '../../src/task';

describe('Data.Task', () => {
  describe('Task.of', () => {
    test('It should create a new Task instance', () => {
      expect(Task.of() instanceof Task).toBe(true);
    });
  });
});
