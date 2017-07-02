import array from './array';
import { curry } from '../lambda';
import Validation from '../data/Validation';

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
