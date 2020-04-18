/* global describe, expect, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  withDefault,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.withDefault', () => {
    test('It should return the default unless the instance is a "Success"', () => {
      const DEFAULT = 'default';
      const FINAL = 'final';

      expect(withDefault(DEFAULT, NotAsked)).toBe(DEFAULT);
      expect(withDefault(DEFAULT, Loading)).toBe(DEFAULT);
      expect(withDefault(DEFAULT, Failure(FINAL))).toBe(DEFAULT);
      expect(withDefault(DEFAULT, Success(FINAL))).toBe(FINAL);
    });
  });
});
