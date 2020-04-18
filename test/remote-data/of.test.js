/* global describe, expect, test */

const RemoteData = require('../../src/remote-data');

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


describe('Data.RemoteData', () => {
  describe('RemoteData.of', () => {
    test('It should return an instance of Success', () => {
      expect(RemoteData.of(1)).toEqual(Success(1));
    });
  });

  describe('NotAsked.of', () => {
    test('It should return the "NotAsked" singleton', () => {
      expect(NotAsked.of()).toBe(NotAsked);
    });
  });

  describe('Loading.of', () => {
    test('It should return the "Loading" singleton', () => {
      expect(Loading.of()).toBe(Loading);
    });
  });

  describe('Success.of', () => {
    test('It should return an instance of Success', () => {
      expect(Success.of(1)).toEqual(Success(1));
    });
  });

  describe('Failure.of', () => {
    test('It should return an instance of Failure', () => {
      expect(Failure.of(1)).toEqual(Failure(1));
    });
  });

  describe('Failure#of', () => {
    test('It should return an instance of Failure', () => {
      expect(Failure().of(1)).toEqual(Failure(1));
    });
  });

  describe('Success#of', () => {
    test('It should return an instance of Success', () => {
      expect(Success().of(1)).toEqual(Success(1));
    });
  });
});
