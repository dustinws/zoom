import typeOf from '../core/typeOf';
import Validation from '../data/Validation';

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
