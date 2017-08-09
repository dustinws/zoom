/* global describe, test, expect */

import Task from '../../src/task';

describe('Data.Task', () => {
  describe('Task.ap', () => {
    test('It should call the function with the inner value.', () => {
      const task = Task.of('boom');
      const toUpper = Task.of(x => x.toUpperCase());

      const result = Task.ap(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#ap', () => {
    test('It should call the function with the inner value.', () => {
      const toUpper = Task.of(x => x.toUpperCase());

      return Task
        .of('boom')
        .ap(toUpper)
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });
});
