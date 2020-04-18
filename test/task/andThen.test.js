/* eslint arrow-body-style: 0 */
/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.andThen', () => {
    test('It should call the function and wait on the returned task.', () => {
      const task = Task.of('boom');
      const toUpper = Task.lift(x => x.toUpperCase());

      const result = Task.andThen(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#andThen', () => {
    test('It should call the function and wait on the returned task.', () => {
      return Task
        .of('boom')
        .andThen(Task.lift(x => x.toUpperCase()))
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });
});
