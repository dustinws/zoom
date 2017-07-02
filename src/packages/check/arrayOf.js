import array from './array';
import { curry } from '../core';
import Validation from '../data/Validation';

/**
 * @memberof module:check
 * @description Ensure each value in an array satisfies a contract.
 * @since v1.14.0
 * @function arrayOf
 * @example
 * import { arrayOf, string } from '@dustinws/zoom/packages/check';
 *
 * arrayOf(string, ['foo']).isSuccess() // true
 * arrayOf(string, [23221]).isSuccess() // false
 *
 * @param {Function} contract The contract to verify
 * @param {Array<Any>} value The array to validate
 * @return {Validation}
 */
const arrayOf = curry((contract, value) =>
  array(value).chain(() => {
    const validation = value
      .reduce((result, item) =>
        result.chain(() => contract(item)), Validation.empty());

    return validation.cata({
      Failure: Validation.Failure,
      Success: () => Validation.Success(value),
    });
  }));

export default arrayOf;
