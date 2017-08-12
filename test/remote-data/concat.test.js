/* global describe, expect, test */

import RemoteData from '../../src/remote-data';

const {
  NotAsked,
  Loading,
  Failure,
  Success,

  concat,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.concat', () => {
    test('It should place the first priority on "NotAsked"', () => {
      expect(concat(NotAsked, NotAsked)).toBe(NotAsked);
      expect(concat(NotAsked, Loading)).toBe(NotAsked);
      expect(concat(NotAsked, Failure())).toBe(NotAsked);
      expect(concat(NotAsked, Success())).toBe(NotAsked);

      expect(concat(NotAsked, NotAsked)).toBe(NotAsked);
      expect(concat(Loading, NotAsked)).toBe(NotAsked);
      expect(concat(Failure(), NotAsked)).toBe(NotAsked);
      expect(concat(Success(), NotAsked)).toBe(NotAsked);
    });

    test('It should place the second priority on "Loading"', () => {
      expect(concat(Loading, NotAsked)).toBe(NotAsked);
      expect(concat(Loading, Loading)).toBe(Loading);
      expect(concat(Loading, Failure())).toBe(Loading);
      expect(concat(Loading, Success())).toBe(Loading);

      expect(concat(NotAsked, Loading)).toBe(NotAsked);
      expect(concat(Loading, Loading)).toBe(Loading);
      expect(concat(Failure(), Loading)).toBe(Loading);
      expect(concat(Success(), Loading)).toBe(Loading);
    });

    test('It should place the third priority on "Failure" and only return the first one', () => {
      expect(concat(Failure(), NotAsked)).toBe(NotAsked);
      expect(concat(Failure(), Loading)).toBe(Loading);
      expect(concat(Failure(1), Failure(2))).toEqual(Failure(1));
      expect(concat(Failure(), Success())).toEqual(Failure());

      expect(concat(NotAsked, Failure())).toBe(NotAsked);
      expect(concat(Loading, Failure())).toBe(Loading);
      expect(concat(Failure(1), Failure(2))).toEqual(Failure(1));
      expect(concat(Success(), Failure())).toEqual(Failure());
    });

    test('If both instances are "Success"s, concat their values and put the result in a new "Success"', () => {
      expect(concat(Success(), NotAsked)).toBe(NotAsked);
      expect(concat(Success(), Loading)).toBe(Loading);
      expect(concat(Success(), Failure())).toEqual(Failure());
      expect(concat(Success('a'), Success('b'))).toEqual(Success('ab'));

      expect(concat(NotAsked, Success())).toBe(NotAsked);
      expect(concat(Loading, Success())).toBe(Loading);
      expect(concat(Failure(), Success())).toEqual(Failure());
      expect(concat(Success('a'), Success('b'))).toEqual(Success('ab'));
    });
  });

  describe('NotAsked.concat', () => {
    test('It should always return the "NotAsked" singleton', () => {
      expect(NotAsked.concat(NotAsked)).toBe(NotAsked);
      expect(NotAsked.concat(Loading)).toBe(NotAsked);
      expect(NotAsked.concat(Failure())).toBe(NotAsked);
      expect(NotAsked.concat(Success())).toBe(NotAsked);
    });
  });

  describe('Loading.concat', () => {
    test('It should always return the "Loading" singleton with priority to "NotAsked"', () => {
      expect(Loading.concat(NotAsked)).toBe(NotAsked);
      expect(Loading.concat(Loading)).toBe(Loading);
      expect(Loading.concat(Failure())).toBe(Loading);
      expect(Loading.concat(Success())).toBe(Loading);
    });
  });

  describe('Failure#concat', () => {
    test('It should return itself over "Success", with priority to "NotAsked" and Loading', () => {
      expect(Failure().concat(NotAsked)).toBe(NotAsked);
      expect(Failure().concat(Loading)).toBe(Loading);
      expect(Failure('a').concat(Failure('b'))).toEqual(Failure('a'));
      expect(Failure().concat(Success())).toEqual(Failure());
    });
  });

  describe('Success#concat', () => {
    test('It should return the other type unless it is also a "Success"', () => {
      expect(Success().concat(NotAsked)).toBe(NotAsked);
      expect(Success().concat(Loading)).toBe(Loading);
      expect(Success().concat(Failure())).toEqual(Failure());
      expect(Success('a').concat(Success('b'))).toEqual(Success('ab'));
    });
  });
});
