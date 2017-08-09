/* eslint arrow-body-style: 0 */
/* global describe, test, expect */

import Task from '../../src/task';

describe('Data.Task', () => {
  describe('Task.recover', () => {
    test('It should allow you to convert a rejected Task into a resolved Task', () => {
      const task = Task.reject('some-value');

      return Task
        .toPromise(Task.recover(Task.of, task))
        .then((value) => {
          expect(value).toBe('some-value');
        });
    });
  });

  describe('Task#recover', () => {
    test('It should allow you to convert a rejected Task into a resolved Task', () => {
      return Task
        .reject('some-value')
        .recover(Task.of)
        .toPromise()
        .then((value) => {
          expect(value).toBe('some-value');
        });
    });
  });
});
