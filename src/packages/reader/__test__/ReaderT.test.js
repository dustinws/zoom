/* global describe, expect, test */
import toUpper from 'ramda/src/toUpper';
import Reader from '../Reader';
import Maybe from '../../maybe';

const ReaderT = Reader.T(Maybe);

describe('ReaderT', () => {
  describe('ReaderT.of', () => {
    test('it should create a new ReaderT', () => {
      const reader = ReaderT.of('foo');

      expect(reader instanceof ReaderT).toBe(true);
    });
  });

  describe('ReaderT.chain', () => {
    test('it should give the raw value to the transform function and return the ReaderT it returns', () => {
      const readerTInstance = ReaderT.of('foo');
      const chainable = () => readerTInstance;

      const result = ReaderT.ask.chain(chainable).run();

      expect(result).toMatchObject({ value: 'foo' });
    });
  });

  describe('ReaderT.andThen', () => {
    test('it should give the raw value to the transform function and return the ReaderT it returns', () => {
      const readerTInstance = ReaderT.of('foo');
      const chainable = () => readerTInstance;

      const result = ReaderT.ask.andThen(chainable).run();

      expect(result).toMatchObject({ value: 'foo' });
    });
  });

  describe('ReaderT.map', () => {
    test('it should give the raw value to the transform function and wrap the return value in a new ReaderT', () => {
      const result = ReaderT.ask.map(toUpper).run('foo');

      expect(result).toMatchObject({ value: 'FOO' });
    });
  });

  describe('ReaderT.map', () => {
    test('it should run the function in the Apply on the value in the ReaderT and return a new ReaderT', () => {
      const result = ReaderT.ask.ap(ReaderT.of(toUpper)).run('foo');

      expect(result).toMatchObject({ value: 'FOO' });
    });
  });
});
