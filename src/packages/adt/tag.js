import symbol from './symbol';

/**
 * @memberof module:Zoom.ADT
 * @description Create a tagged abstract data type. Tags the object with the
 * "ADT.symbol" value, and creates a "toString" method.
 * @function tag
 * @since v1.0.0
 * @example
 * import { tag, symbol } from '@dustinws/zoom/adt';
 *
 * const Point2D = tag('Point2D', 'x', 'y');
 *
 * const point = Point2D(10, 15);
 *
 * point.x // 10
 * point.y // 15
 *
 * point instanceof Point2D // true
 * point[symbol] // 'Point2D'
 * point.toString() // 'Point2D(0, 0)'
 *
 * @param  {String} type The name of the type
 * @param  {...String} params Parameter names
 * @return {Function}
 */
function tag(type, ...params) {
  // Store the constructor on a temporary object so that
  // the constructor name will correctly match the type.
  let tmp = {
    // eslint-disable-next-line object-shorthand, func-names, consistent-return
    [type]: function (...args) {
      // Call new here so the consumer doesn't have to.
      if (!(this instanceof Adt)) {
        return new Adt(...args);
      }

      // Set all instance variables.
      params.forEach((param, idx) => {
        this[param] = args[idx];
      });
    },
  };

  // Retrieve the constructor and send the temporary object to GC.
  const Adt = tmp[type];
  tmp = null;

  Adt.prototype[symbol] = type;

  Adt.prototype.toString = function toString() {
    const paramsList = params
      .map(param => this[param])
      .join(', ')
      .trim();

    const paramDisplay = params.length ? `(${paramsList})` : '';
    return `${this[symbol]}${paramDisplay}`;
  };

  return Adt;
}

export default tag;
