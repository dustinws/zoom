/* global describe, expect, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  isSuccess,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.isSuccess', () => {
    test('It should only return "true" for the "Success" instances', () => {
      expect(isSuccess(NotAsked)).toBe(false);
      expect(isSuccess(Loading)).toBe(false);
      expect(isSuccess(Failure())).toBe(false);
      expect(isSuccess(Success())).toBe(true);
    });
  });
});
