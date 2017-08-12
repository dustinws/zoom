'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.andThen = exports.caseOf = exports.cata = exports.liftA4 = exports.liftA3 = exports.liftA2 = undefined;

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _invoker = require('ramda/src/invoker');

var _invoker2 = _interopRequireDefault(_invoker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// liftA2 :: Monad m => (a -> b -> c) -> m a -> m b -> m c
var liftA2 = exports.liftA2 = (0, _curry2.default)(function (callback, a1, a2) {
  return a1.chain(function (a) {
    return a2.map(function (b) {
      return callback(a, b);
    });
  });
});

// liftA3 :: Monad m => (a -> b -> c -> d) -> m a -> m b -> m c -> m d
var liftA3 = exports.liftA3 = (0, _curry2.default)(function (callback, a1, a2, a3) {
  return a1.chain(function (a) {
    return a2.chain(function (b) {
      return a3.map(function (c) {
        return callback(a, b, c);
      });
    });
  });
});

// liftA3 :: Monad m => (a -> b -> c -> d -> e) -> m a -> m b -> m c -> m d -> m e
var liftA4 = exports.liftA4 = (0, _curry2.default)(function (callback, a1, a2, a3, a4) {
  return a1.chain(function (a) {
    return a2.chain(function (b) {
      return a3.chain(function (c) {
        return a4.map(function (d) {
          return callback(a, b, c, d);
        });
      });
    });
  });
});

var cata = exports.cata = (0, _invoker2.default)(1, 'cata');
var caseOf = exports.caseOf = (0, _invoker2.default)(1, 'caseOf');
var andThen = exports.andThen = (0, _invoker2.default)(1, 'andThen');