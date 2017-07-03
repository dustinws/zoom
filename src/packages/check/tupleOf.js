import array from './array';
import curry from '../lambda/curry';
import Validation from '../data/Validation';

/**
 * @memberof module:Zoom.Check
 * @description Validate a co-product indexed by numbers.
 * @since v1.14.0
 * @function tupleOf
 * @example
 * import { tupleOf, number, string } from '@dustinws/zoom/packages/check';
 *
 * const user = tupleOf([number, string]);
 *
 * user(['1', 'dustin']).isSuccess() // true
 * user([1, 'dustin']).isSuccess() // false
 * user(['dustin']).isSuccess() // false
 *
 * @param {Object} contracts An array of contracts
 * @param {Object} value The array to validate
 * @return {Validation}
 */
export default curry((contracts, value) =>
  array(contracts)
    .chain(() => array(value))
    .chain(() => {
      if (contracts.length !== value.length) {
        return Validation.Failure(new TypeError('Invalid Product Length.'));
      }
      const validation = value.reduce((result, item, idx) =>
        result.chain(() => contracts[idx](value[idx])), Validation.empty());

      return validation.cata({
        Failure: Validation.Failure,
        Success: () => Validation.Success(value),
      });
    }));
