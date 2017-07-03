import typeOf from '../lang/typeOf';
import Validation from '../data/validation';

/**
 * Return a Success if an object is of the expected type, and a Failure if
 * it is not.
 *
 * @param  {String}  expectedType
 * @return {Function}
 */
export default function isType(expectedType) {
  return (value) => {
    const actualType = typeOf(value);

    if (actualType !== expectedType) {
      return Validation.Failure(
        new TypeError(`Expected type ${expectedType} but got type ${actualType}!`),
      );
    }

    return Validation.Success(value);
  };
}
