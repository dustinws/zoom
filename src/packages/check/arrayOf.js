import array from './array';
import { curry } from '../lambda';
import Validation from '../data/Validation';

export default curry((contract, value) =>
  array(value).chain(() => {
    const validation = value
      .reduce((result, item) =>
        result.chain(() => contract(item)), Validation.empty());

    return validation.cata({
      Failure: Validation.Failure,
      Success: () => Validation.Success(value),
    });
  }));
