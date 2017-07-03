import object from './object';
import curry from '../lambda/curry';
import Validation from '../data/Validation';

/**
 * @memberof module:Zoom.Check
 * @description Ensure each value in an object satisfies a contract.
 * @since v1.14.0
 * @function objectOf
 * @example
 * import { objectOf, string } from '@dustinws/zoom/packages/check';
 *
 * objectOf(string, { a: '1' }).isSuccess() // true
 * objectOf(string, { a: 1 }).isSuccess() // false
 *
 * @param {Object} contract The contract to verify
 * @param {Object} value The array to validate
 * @return {Validation}
 */
export default curry((contract, value) =>
  object(value).chain(() => {
    const validation = Object
      .keys(value)
      .reduce((result, item) =>
        result.chain(() => contract(value[item])), Validation.empty());

    return validation.cata({
      Failure: Validation.Failure,
      Success: () => Validation.Success(value),
    });
  }));
