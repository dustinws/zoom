import Validation from '../data/Validation';

/**
 * @memberof module:check
 * @description Create a contract that succeeds if any of it's inner contracts
 * succeeds.
 * @since v1.14.0
 * @function union
 * @example
 * import { union, string, bool } from '@dustinws/zoom/packages/check';
 *
 * const myType = union([string, bool]);
 *
 * myType('').isSuccess() // true
 * myType(true).isSuccess() // false
 * myType(32).isSuccess() // false
 *
 * @param {Object} contracts An array of contracts
 * @param {Object} value The value to validate
 * @return {Validation}
 */
export default function union(contracts) {
  return (value) => {
    const validations = contracts.map(f => f(value));
    const valid = validations.find(x => x.isSuccess());

    if (valid) {
      return valid;
    }

    return Validation.Failure(validations.map(x => x.value));
  };
}
