import object from './object';
import { curry } from '../lambda';
import Validation from '../data/Validation';

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
