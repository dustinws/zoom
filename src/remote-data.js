const FL = require('fantasy-land');

const { union } = require('./adt');
const { __, curry, always, compose } = require('./_tools');


const RemoteData = union('RemoteData', {
  NotAsked: [],
  Loading: [],
  Failure: ['value'],
  Success: ['value'],
});

const {
  NotAsked,
  Loading,
  Failure,
  Success,
} = RemoteData;


/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

RemoteData.NotAsked.of = always(RemoteData.NotAsked);
RemoteData.Loading.of = always(RemoteData.Loading);
RemoteData.Success.of = v => Success(v);
RemoteData.Failure.of = v => Failure(v);

// of :: b -> RemoteData a b
RemoteData.of = function of(value) {
  return Success(value);
};

// chain :: (b -> RemoteData a c) -> RemoteData a b -> RemoteData a c
RemoteData.chain = curry((callback, remote) => // eslint-disable-line no-confusing-arrow
  remote.isSuccess() ? callback(remote.value) : remote);

// andThen :: (b -> RemoteData a c) -> RemoteData a b -> RemoteData a b
RemoteData.andThen = RemoteData.chain;

// map :: (b -> c) -> RemoteData a b -> RemoteData a c
RemoteData.map = curry((transform, remote) =>
  RemoteData.chain(compose(RemoteData.of, transform), remote));

// ap :: Apply (b -> c) -> RemoteData a b -> RemoteData a c
RemoteData.ap = curry((left, right) =>
  RemoteData.chain(RemoteData.map(__, right), left));

// concat :: RemoteData e a -> RemoteData e a -> RemoteData e a
RemoteData.concat = curry((left, right) => {
  // Priority one
  if (left.isNotAsked()) return left;
  if (right.isNotAsked()) return right;

  // Priority 2
  if (left.isLoading()) return left;
  if (right.isLoading()) return right;

  // Priority 3
  if (left.isFailure()) return left;
  if (right.isFailure()) return right;

  return Success(left.value.concat(right.value));
});

// isNotAsked :: RemoteData a b -> Bool
RemoteData.isNotAsked = remote => remote === NotAsked;

// isLoading :: RemoteData a b -> Bool
RemoteData.isLoading = remote => remote === Loading;

// isFailure :: RemoteData a b -> Bool
RemoteData.isFailure = remote => remote instanceof Failure;

// isSuccess :: RemoteData a b -> Bool
RemoteData.isSuccess = remote => remote instanceof Success;

// withDefault :: b -> RemoteData a b -> b
RemoteData.withDefault = curry((defaultValue, remote) => // eslint-disable-line no-confusing-arrow
  remote.isSuccess() ? remote.value : defaultValue);


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

// concat :: RemoteData a b ~> RemoteData a b -> RemoteData a b
RemoteData.prototype.concat = function concat(other) {
  return RemoteData.concat(this, other);
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
RemoteData[FL.of] = RemoteData.of;
RemoteData.prototype[FL.of] = RemoteData.prototype.of;

// RemoteData Chain
RemoteData[FL.chain] = RemoteData.chain;
RemoteData.prototype[FL.chain] = RemoteData.prototype.chain;

// RemoteData Functor
RemoteData[FL.map] = RemoteData.map;
RemoteData.prototype[FL.map] = RemoteData.prototype.map;

// RemoteData Apply
RemoteData[FL.ap] = RemoteData.ap;
RemoteData.prototype[FL.ap] = RemoteData.prototype.ap;

// RemoteData Semigroup
RemoteData[FL.concat] = RemoteData.concat;
RemoteData.prototype[FL.concat] = RemoteData.prototype.concat;


module.exports = RemoteData;
