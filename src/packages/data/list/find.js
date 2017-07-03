import curry from '../../lambda/curry';
import Maybe from '../Maybe';

/**
 * @description Find the first element in a list that satisfies a predicate
 * function. Returns a Maybe.
 * @memberof module:Zoom.Data.List
 * @since v1.17.0
 * @function find
 * @example
 * // find :: (a -> Bool) -> [a] -> Maybe a
 * import { find } from '@dustinws/zoom/data/list';
 *
 * const isOdd = n => n % 2;
 *
 * find(isOdd, [2, 4, 2, 3]) // Just(3)
 * find(isOdd, [2, 4, 2, 2]) // Nothing
 *
 * @param  {Function} predicate The function used to match the element
 * @param  {Array<T>} list The list to use
 * @return {Maybe<T>}
 */
function find(predicate, list) {
  for (let i = 0; i < list.length; i += 1) {
    if (predicate(list[i])) {
      return Maybe.Just.of(list[i]);
    }
  }

  return Maybe.Nothing;
}

export default curry(find);
