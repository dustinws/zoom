'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _adt = require('../adt');

var Task = (0, _adt.tag)('Task', 'fork');

Task.of = function (value) {
  return Task(function (_, resolve) {
    return resolve(value);
  });
};

Task.reject = function (value) {
  return Task(function (reject) {
    return reject(value);
  });
};

Task.prototype.of = function of(value) {
  return Task.of(value);
};

Task.prototype.chain = function chain(transform) {
  var _this = this;

  return Task(function (reject, resolve) {
    return _this.fork(reject, function (value) {
      return transform(value).fork(reject, resolve);
    });
  });
};

Task.prototype.map = function map(transform) {
  return this.chain(function (x) {
    return Task.of(transform(x));
  });
};

Task.prototype.toPromise = function toPromise() {
  var _this2 = this;

  var Promise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.Promise;

  return new Promise(function (resolve, reject) {
    return _this2.fork(reject, resolve);
  });
};

Task.prototype.recover = function recover(transform) {
  var _this3 = this;

  return Task(function (reject, resolve) {
    return _this3.fork(function (error) {
      return transform(error).fork(reject, resolve);
    }, resolve);
  });
};

Task.parallel = function (tasks) {
  return Task(function (reject, resolve) {
    var remaining = tasks.length;

    var results = Array(tasks.length);

    tasks.forEach(function (task, idx) {
      task.fork(reject, function (value) {
        remaining -= 1;

        results[idx] = value;

        if (remaining === 0) resolve(results);
      });
    });
  });
};

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

exports.default = Task;
module.exports = exports['default'];