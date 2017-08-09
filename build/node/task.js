'use strict';

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Task = (0, _adt.tag)('Task', 'fork');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: b -> Task a b
Task.of = function (value) {
  return Task(function (_, resolve) {
    return resolve(value);
  });
};

// of :: a -> Task a b
Task.reject = function (value) {
  return Task(function (reject) {
    return reject(value);
  });
};

// fork :: (a -> c) -> (b -> c) -> Task a b -> d
Task.fork = (0, _curry2.default)(function (reject, resolve, task) {
  return task.fork(reject, resolve);
});

// chain :: (b -> Task a c) -> Task a b -> Task a c
Task.chain = (0, _curry2.default)(function (transform, task) {
  return Task(function (reject, resolve) {
    return task.fork(reject, function (value) {
      return transform(value).fork(reject, resolve);
    });
  });
});

// andThen :: (b -> Task a c) -> Task a b -> Task a c
Task.andThen = Task.chain;

// map :: (b -> c) -> Task a b -> Task a c
Task.map = (0, _curry2.default)(function (transform, task) {
  return Task.chain(function (x) {
    return Task.of(transform(x));
  }, task);
});

// ap :: Apply (b -> c) -> Task a b -> Task a c
Task.ap = (0, _curry2.default)(function (apply, task) {
  return Task.chain(function (transform) {
    return task.map(transform);
  }, apply);
});

// toPromise :: Task a b -> Promise a b
Task.toPromise = function (task) {
  var Promise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.Promise;
  return new Promise(function (resolve, reject) {
    return task.fork(reject, resolve);
  });
};

// recover :: (a -> Task d c) -> Task a b -> Task d c
Task.recover = (0, _curry2.default)(function (transform, task) {
  return Task(function (reject, resolve) {
    return task.fork(function (error) {
      return transform(error).fork(reject, resolve);
    }, resolve);
  });
});

// parallel :: [Task a b] -> Task a [b]
Task.parallel = function (tasks) {
  return Task(function (reject, resolve) {
    var remaining = tasks.length;
    var rejected = false;
    var rejectedError = void 0;

    // Create the results array.
    var results = Array(tasks.length);

    // Fork each task
    tasks.forEach(function (task, idx) {
      task.fork(function (error) {
        if (!rejected) {
          rejected = true;
          rejectedError = error;
          return reject(error);
        }

        return rejectedError;
      }, function (value) {
        // Decrement the pending count
        remaining -= 1;

        // Store the value in the results array at the same
        // index the task was in.
        results[idx] = value;

        // Resolve if all tasks are done.
        if (remaining === 0) resolve(results);
      });
    });
  });
};

// lift :: (a -> b) -> (a -> Task b)
Task.lift = function (func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return Task(function (_, resolve) {
      return resolve(func.apply(undefined, args));
    });
  };
};

// liftNode :: (a, (b, c) -> d) -> (a -> Task b c)
Task.liftNode = function (func) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return Task(function (reject, resolve) {
      return func.apply(undefined, args.concat([function (error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      }]));
    });
  };
};

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Task a b ~> c -> Task f c
Task.prototype.of = function of(value) {
  return Task.of(value);
};

// chain :: Task a b ~> (b -> Task a c) -> Task a c
Task.prototype.chain = function chain(transform) {
  return Task.chain(transform, this);
};

// andThen :: Task a b ~> (b -> Task a c) -> Task a c
Task.prototype.andThen = Task.prototype.chain;

// map :: Task a b ~> (b -> c) -> Task a c
Task.prototype.map = function map(transform) {
  return Task.map(transform, this);
};

// ap :: Task a b ~> Apply (b -> c) -> Task a c
Task.prototype.ap = function ap(apply) {
  return Task.ap(apply, this);
};

// toPromise :: Task a b -> c -> Promise b
Task.prototype.toPromise = function toPromise() {
  var Promise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.Promise;

  return Task.toPromise(this, Promise);
};

// recover :: Task a b ~> (a -> Task d c) -> Task d c
Task.prototype.recover = function recover(transform) {
  return Task.recover(transform, this);
};

/*
 |------------------------------------------------------------------------------
 | Fantasy Land
 |------------------------------------------------------------------------------
 */

// Static Monad
Task[_fantasyLand2.default.of] = Task.of;
Task[_fantasyLand2.default.chain] = Task.chain;
Task[_fantasyLand2.default.map] = Task.map;
Task[_fantasyLand2.default.ap] = Task.ap;

// Instance Monad
Task.prototype[_fantasyLand2.default.of] = Task.prototype.of;
Task.prototype[_fantasyLand2.default.chain] = Task.prototype.chain;
Task.prototype[_fantasyLand2.default.map] = Task.prototype.map;
Task.prototype[_fantasyLand2.default.ap] = Task.prototype.ap;

module.exports = Task;