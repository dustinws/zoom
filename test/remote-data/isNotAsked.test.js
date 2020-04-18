/* global describe, expect, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  isNotAsked,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.isNotAsked', () => {
    test('It should only return "true" for the "NotAsked" singleton', () => {
      expect(isNotAsked(NotAsked)).toBe(true);
      expect(isNotAsked(Loading)).toBe(false);
      expect(isNotAsked(Failure())).toBe(false);
      expect(isNotAsked(Success())).toBe(false);
    });
  });
});
