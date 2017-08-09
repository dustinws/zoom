/* global describe, test, expect */

import Task from '../../src/task';

describe('Data.Task', () => {
  describe('Task.reject', () => {
    test('It should create a new Task instance', () => {
      expect(Task.reject() instanceof Task).toBe(true);
    });
  });
});
