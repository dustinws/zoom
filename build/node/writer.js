'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fantasyLand = require('fantasy-land');

var _fantasyLand2 = _interopRequireDefault(_fantasyLand);

var _ = require('ramda/src/__');

var _2 = _interopRequireDefault(_);

var _curry = require('ramda/src/curry');

var _curry2 = _interopRequireDefault(_curry);

var _tuple = require('./tuple');

var _tuple2 = _interopRequireDefault(_tuple);

var _adt = require('./adt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Writer = (0, _adt.tag)('Writer', 'value');

/*
 |------------------------------------------------------------------------------
 | Static Members
 |------------------------------------------------------------------------------
 */

// of :: a -> Writer w a
Writer.of = function (value) {
  return Writer((0, _tuple2.default)(value, []));
};

// tell :: w -> Writer w a -> Writer w a
Writer.tell = (0, _curry2.default)(function (value, writer) {
  return Writer((0, _tuple2.default)(_tuple2.default.fst(writer.value), _tuple2.default.snd(writer.value).concat(value)));
});

// chain :: (a -> Writer w b) -> Writer w a -> Writer w b
Writer.chain = (0, _curry2.default)(function (transform, writer) {
  var _writer$value = _slicedToArray(writer.value, 2),
      value = _writer$value[0],
      currentLogs = _writer$value[1];

  var _transform$value = _slicedToArray(transform(value).value, 2),
      newVal = _transform$value[0],
      newLogs = _transform$value[1];

  return Writer((0, _tuple2.default)(newVal, currentLogs.concat(newLogs)));
});

// andThen :: (a -> Writer w b) -> Writer w a -> Writer w b
Writer.andThen = Writer.chain;

// map :: (a -> b) -> Writer w a -> Writer w b
Writer.map = (0, _curry2.default)(function (transform, writer) {
  return Writer.chain(function (x) {
    return Writer.of(transform(x));
  }, writer);
});

// ap :: Apply (a -> b) -> Writer w a -> Writer w b
Writer.ap = (0, _curry2.default)(function (apply, writer) {
  return Writer.chain(Writer.map(_2.default, writer), apply);
});

/*
 |------------------------------------------------------------------------------
 | Instance Members
 |------------------------------------------------------------------------------
 */

// of :: Writer w a ~> b -> Writer w b
Writer.prototype.of = function of(value) {
  return Writer.of(value);
};

// chain :: Writer w a ~> (a -> Writer w b) -> Writer w b
Writer.prototype.chain = function chain(transform) {
  return Writer.chain(transform, this);
};

// andThen :: Writer w a ~> (a -> Writer w b) -> Writer w b
Writer.prototype.andThen = Writer.prototype.chain;

// tell :: Writer w a ~> w -> Writer w a
Writer.prototype.tell = function tell(log) {
  return Writer.tell(log, this);
};

// map :: Writer w a ~> (a -> b) -> Writer w b
Writer.prototype.map = function map(transform) {
  return Writer.map(transform, this);
};

// ap :: Writer w a ~> Apply (a -> b) -> Writer w b
Writer.prototype.ap = function ap(apply) {
  return Writer.ap(apply, this);
};

/*
|------------------------------------------------------------------------------
| Fantasy Land
|------------------------------------------------------------------------------
*/

// Static Monad
Writer[_fantasyLand2.default.of] = Writer.of;
Writer[_fantasyLand2.default.chain] = Writer.chain;
Writer[_fantasyLand2.default.map] = Writer.map;
Writer[_fantasyLand2.default.ap] = Writer.ap;

// Instance Monad
Writer.prototype[_fantasyLand2.default.of] = Writer.prototype.of;
Writer.prototype[_fantasyLand2.default.chain] = Writer.prototype.chain;
Writer.prototype[_fantasyLand2.default.map] = Writer.prototype.map;
Writer.prototype[_fantasyLand2.default.ap] = Writer.prototype.ap;

module.exports = Writer;