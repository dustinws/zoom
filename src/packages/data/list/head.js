import Maybe from '../maybe';

/**
 * @description Get the first element of a potentially empty array.
 * @memberof module:Zoom.Data.List
 * @since v1.15.0
 * @function head
 * @example
 * // head :: [a] -> Maybe a
 * import { head } from '@dustinws/zoom/data/list';
 *
 * head([1]); // Just(1)
 * head([]); // Nothing
 *
 * @param  {Array<T>} list The array to use
 * @return {Maybe<T>}
 */
function head(list) {
  return Maybe.fromNullable(list[0]);
}

export default head;
