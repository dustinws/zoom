/* eslint arrow-body-style: 0 */
/* global describe, test, expect */

const Task = require('../../src/task');

describe('Data.Task', () => {
  describe('Task.map', () => {
    test('It should call the function with the inner value.', () => {
      const task = Task.of('boom');
      const toUpper = x => x.toUpperCase();

      const result = Task.map(toUpper, task);

      return Task
        .toPromise(result)
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });

  describe('Task#map', () => {
    test('It should call the function with the inner value.', () => {
      return Task
        .of('boom')
        .map(x => x.toUpperCase())
        .toPromise()
        .then((value) => {
          expect(value).toBe('BOOM');
        });
    });
  });
});
