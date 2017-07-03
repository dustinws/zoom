import typeOf from '../lang/typeOf';
import Validation from '../data/validation';

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
