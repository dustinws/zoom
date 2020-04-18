/* global describe, expect, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  isLoading,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.isLoading', () => {
    test('It should only return "true" for the "NotAsked" singleton', () => {
      expect(isLoading(NotAsked)).toBe(false);
      expect(isLoading(Loading)).toBe(true);
      expect(isLoading(Failure())).toBe(false);
      expect(isLoading(Success())).toBe(false);
    });
  });
});
