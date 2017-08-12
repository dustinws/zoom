/* global describe, expect, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  isFailure,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.isFailure', () => {
    test('It should only return "true" for the "Failure" instances', () => {
      expect(isFailure(NotAsked)).toBe(false);
      expect(isFailure(Loading)).toBe(false);
      expect(isFailure(Failure())).toBe(true);
      expect(isFailure(Success())).toBe(false);
    });
  });
});
