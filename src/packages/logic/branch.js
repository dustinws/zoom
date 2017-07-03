import curryN from '../core/curryN';

/**
 * @description A curried wrapper for an if / else statement. If the function
 * at the first parameter returns truthy, then the second function will be
 * called with the same arguments. If it returns falsy, the third function
 * will be called with the same arguments.
 * @memberof module:Zoom.Logic
 * @function branch
 * @since v1.15.0
 * @example
 * import { prop, pipe } from '@dustinws/zoom/packages/core';
 * import { branch, eq } from '@dustinws/zoom/packages/logic';
 * import { True, False } from '@dustinws/zoom/packages/logic';
 *
 * const isEmpty = branch(pipe(prop('length'), eq(0)), True, False);
 *
 * isEmpty([]) // true
 * isEmpty('') // true
 *
 * @param  {Function} predicate The predicate to call
 * @param  {Function} ifTrue The function to call if the predicate is satisfied
 * @param  {Function} ifFalse The function to call if the predicat is not satisfied
 * @param  {...Any} args An arbitrary amount of arguments to give to each function
 * @return {Any}
 */
const branch = curryN(4, (predicate, ifTrue, ifFalse, ...args) => {
  if (predicate(...args)) {
    return ifTrue(...args);
  }

  return ifFalse(...args);
});

export default branch;
