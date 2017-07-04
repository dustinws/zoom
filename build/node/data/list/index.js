'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chain = require('./chain');

var _chain2 = _interopRequireDefault(_chain);

var _concat = require('./concat');

var _concat2 = _interopRequireDefault(_concat);

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

var _empty = require('./empty');

var _empty2 = _interopRequireDefault(_empty);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _filterWhere = require('./filterWhere');

var _filterWhere2 = _interopRequireDefault(_filterWhere);

var _find = require('./find');

var _find2 = _interopRequireDefault(_find);

var _findWhere = require('./findWhere');

var _findWhere2 = _interopRequireDefault(_findWhere);

var _fold = require('./fold');

var _fold2 = _interopRequireDefault(_fold);

var _head = require('./head');

var _head2 = _interopRequireDefault(_head);

var _includes = require('./includes');

var _includes2 = _interopRequireDefault(_includes);

var _indexOf = require('./indexOf');

var _indexOf2 = _interopRequireDefault(_indexOf);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _isEmpty = require('./isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _last = require('./last');

var _last2 = _interopRequireDefault(_last);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _of = require('./of');

var _of2 = _interopRequireDefault(_of);

var _reject = require('./reject');

var _reject2 = _interopRequireDefault(_reject);

var _rejectWhere = require('./rejectWhere');

var _rejectWhere2 = _interopRequireDefault(_rejectWhere);

var _tail = require('./tail');

var _tail2 = _interopRequireDefault(_tail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class List
 * @description
 * This module contains functions for array interactions. It is a static object
 * and is not an actual class. The class tag was used in the documentation
 * for namespacing and formatting.
 */

exports.default = {
  chain: _chain2.default,
  concat: _concat2.default,
  each: _each2.default,
  empty: _empty2.default,
  filter: _filter2.default,
  filterWhere: _filterWhere2.default,
  find: _find2.default,
  findWhere: _findWhere2.default,
  fold: _fold2.default,
  head: _head2.default,
  includes: _includes2.default,
  indexOf: _indexOf2.default,
  init: _init2.default,
  isEmpty: _isEmpty2.default,
  last: _last2.default,
  map: _map2.default,
  of: _of2.default,
  reject: _reject2.default,
  rejectWhere: _rejectWhere2.default,
  tail: _tail2.default
};
module.exports = exports['default'];