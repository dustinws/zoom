'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _identity = require('ramda/src/identity');

var _identity2 = _interopRequireDefault(_identity);

var _always = require('ramda/src/always');

var _always2 = _interopRequireDefault(_always);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RemoteData = (0, _adt.union)('RemoteData', {
  NotAsked: [],
  Loading: [],
  Failure: ['value'],
  Success: ['value']
});

var NotAsked = RemoteData.NotAsked,
    Loading = RemoteData.Loading,
    Failure = RemoteData.Failure,
    Success = RemoteData.Success;

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> RemoteData a b

RemoteData.of = function of(value) {
  return Success(value);
};

// chain :: (b -> RemoteData a c) -> RemoteData a b -> RemoteData a c
RemoteData.chain = (0, _curry2.default)(function (callback, remote) {
  return remote.cata({
    NotAsked: (0, _always2.default)(remote),
    Loading: (0, _always2.default)(remote),
    Failure: (0, _always2.default)(remote),
    Success: callback
  });
});

// andThen :: (b -> RemoteData a c) -> RemoteData a b -> RemoteData a b
RemoteData.andThen = RemoteData.chain;

// map :: (b -> c) -> RemoteData a b -> RemoteData a c
RemoteData.map = (0, _curry2.default)(function (transform, maybe) {
  return RemoteData.chain((0, _compose2.default)(RemoteData.of, transform), maybe);
});

// ap :: Apply (b -> c) -> RemoteData a b -> RemoteData a c
RemoteData.ap = (0, _curry2.default)(function (left, right) {
  return RemoteData.chain(RemoteData.map(_2.default, right), left);
});

// isNotAsked :: RemoteData a b -> Bool
RemoteData.isNotAsked = function (remote) {
  return remote === NotAsked;
};

// isLoading :: RemoteData a b -> Bool
RemoteData.isLoading = function (remote) {
  return remote === Loading;
};

// isFailure :: RemoteData a b -> Bool
RemoteData.isFailure = function (remote) {
  return remote instanceof Failure;
};

// isSuccess :: RemoteData a b -> Bool
RemoteData.isSuccess = function (remote) {
  return remote instanceof Success;
};

// withDefault :: b -> RemoteData a b -> b
RemoteData.withDefault = (0, _curry2.default)(function (defaultValue, maybe) {
  return maybe.cata({
    NotAsked: (0, _always2.default)(defaultValue),
    Loading: (0, _always2.default)(defaultValue),
    Failure: (0, _always2.default)(defaultValue),
    Success: _identity2.default
  });
});

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

RemoteData.prototype.of = function of(value) {
  return Success(value);
};

// Cata :: { NotAsked: () -> c, Loading: () -> c, Failure: e -> c, Success: b -> c }
// caseOf :: RemoteData a b ~> Cata -> c
RemoteData.prototype.caseOf = function caseOf(cases) {
  return this.cata(cases);
};

// chain :: RemoteData a b ~> (b -> RemoteData a c) -> RemoteData a c
RemoteData.prototype.chain = function chain(transform) {
  return RemoteData.chain(transform, this);
};

// andThen :: RemoteData a b ~> (b -> RemoteData a c) -> RemoteData a c
RemoteData.prototype.andThen = function andThen(transform) {
  return RemoteData.chain(transform, this);
};

// map :: RemoteData a b ~> (b -> c) -> RemoteData a c
RemoteData.prototype.map = function map(transform) {
  return RemoteData.map(transform, this);
};

// ap :: RemoteData a b ~> Apply (b -> c) -> RemoteData a c
RemoteData.prototype.ap = function ap(transform) {
  return RemoteData.ap(transform, this);
};

// isNotAsked :: RemoteData a b ~> c -> Bool
RemoteData.prototype.isNotAsked = function isNotAsked() {
  return RemoteData.isNotAsked(this);
};

// isLoading :: RemoteData a b ~> c -> Bool
RemoteData.prototype.isLoading = function isLoading() {
  return RemoteData.isLoading(this);
};

// isFailure :: RemoteData a b ~> c -> Bool
RemoteData.prototype.isFailure = function isFailure() {
  return RemoteData.isFailure(this);
};

// isSuccess :: RemoteData a b ~> c -> Bool
RemoteData.prototype.isSuccess = function isSuccess() {
  return RemoteData.isSuccess(this);
};

// withDefault :: RemoteData a b ~> b -> b
RemoteData.prototype.withDefault = function withDefault(defaultValue) {
  return RemoteData.withDefault(defaultValue, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// RemoteData Applicative
RemoteData[_fantasyLand2.default.of] = RemoteData.of;
RemoteData.prototype[_fantasyLand2.default.of] = RemoteData.prototype.of;

// RemoteData Chain
RemoteData[_fantasyLand2.default.chain] = RemoteData.chain;
RemoteData.prototype[_fantasyLand2.default.chain] = RemoteData.prototype.chain;

// RemoteData Functor
RemoteData[_fantasyLand2.default.map] = RemoteData.map;
RemoteData.prototype[_fantasyLand2.default.map] = RemoteData.prototype.map;

// RemoteData Apply
RemoteData[_fantasyLand2.default.ap] = RemoteData.ap;
RemoteData.prototype[_fantasyLand2.default.ap] = RemoteData.prototype.ap;

module.exports = RemoteData;