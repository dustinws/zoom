import Validation from '../data/Validation';

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
