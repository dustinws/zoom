import curry from './curry';
import prop from './prop';
import List from '../data/List';
import Maybe from '../data/Maybe';

/**
 * @description Get the value at the given path on the given object. Returns
 * a Maybe.
 * @memberof module:Zoom.Core
 * @since v1.16.0
 * @function path
 * @example
 * import { path } from '@dustinws/zoom/packages/core';
 *
 * path(['a', 'b'], { a: { b: 1 } }) // Just(1)
 * path(['rows', 0], { rows: [1] }) // Just(1)
 * path(['a', 'b', 'c', 0, 'd'], {}) // Nothing
 *
 * @param  {Array<String | Number>} key An array of indices
 * @param  {Object} object The object to query
 * @return {Maybe<Any>}
 */
function path(crumbs, object) {
  return List.fold((a, b) => a.chain(prop(b)), Maybe.Just(object), crumbs);
}

export default curry(path);
