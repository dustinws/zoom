'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curryN = require('../lambda/curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description A curried wrapper for an if / else statement. If the function
 * at the first parameter returns truthy, then the second function will be
 * called with the same arguments. If it returns falsy, the third function
 * will be called with the same arguments.
 * @memberof module:Zoom.Logic
 * @function branch
 * @since v1.15.0
 * @example
 * import { prop, pipe } from '@dustinws/zoom/core';
 * import { branch, eq } from '@dustinws/zoom/logic';
 * import { True, False } from '@dustinws/zoom/logic';
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
var branch = (0, _curryN2.default)(4, function (predicate, ifTrue, ifFalse) {
  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  if (predicate.apply(undefined, args)) {
    return ifTrue.apply(undefined, args);
  }

  return ifFalse.apply(undefined, args);
});

exports.default = branch;
module.exports = exports['default'];