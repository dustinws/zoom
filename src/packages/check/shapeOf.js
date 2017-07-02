import object from './object';
import { curry } from '../core';
import Validation from '../data/Validation';

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
