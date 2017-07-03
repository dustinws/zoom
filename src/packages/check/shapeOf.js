import object from './object';
import curry from '../lambda/curry';
import Validation from '../data/validation';

/**
 * @memberof module:Zoom.Check
 * @description Validate a co-product indexed by strings.
 * @since v1.14.0
 * @function shapeOf
 * @example
 * import { shapeOf, string, bool } from '@dustinws/zoom/check';
 *
 * const user = shapeOf({
 *   id: string,
 *   admin: bool,
 * });
 *
 * user({ id: '1', active: false }).isSuccess() // true
 * user({ id: 1, active: false }).isSuccess() // false
 * user({ active: false }).isSuccess() // false
 *
 * @param {Object} contracts An object of contracts
 * @param {Object} value The object to validate
 * @return {Validation}
 */
export default curry((contracts, value) =>
  object(contracts)
    .chain(() => object(value))
    .chain(() => {
      if (Object.keys(contracts).length !== Object.keys(value).length) {
        return Validation.Failure(new TypeError('Invalid Product Length.'));
      }
      const validation = Object
        .keys(value)
        .reduce((result, item) =>
          result.chain(() => contracts[item](value[item])), Validation.empty());

      return validation.cata({
        Failure: Validation.Failure,
        Success: () => Validation.Success(value),
      });
    }));
