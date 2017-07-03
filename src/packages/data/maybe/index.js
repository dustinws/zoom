import FL from 'fantasy-land';
import Maybe from './Maybe';

// Maybe Applicative
Maybe[FL.of] = Maybe.of;

// Maybe Chain
Maybe[FL.chain] = Maybe.chain;
Maybe.prototype[FL.chain] = Maybe.prototype.chain;

// Maybe Functor
Maybe[FL.map] = Maybe.map;
Maybe.prototype[FL.map] = Maybe.prototype.map;

// Maybe Apply
Maybe[FL.ap] = Maybe.ap;
Maybe.prototype[FL.ap] = Maybe.prototype.ap;


// Just Applicative
Maybe.Just[FL.of] = Maybe.Just.of;
Maybe.Just.prototype[FL.of] = Maybe.Just.prototype.of;

// Maybe.Just Chain
Maybe.Just[FL.chain] = Maybe.Just.chain;
Maybe.Just.prototype[FL.chain] = Maybe.Just.prototype.chain;

// Maybe.Just Functor
Maybe.Just[FL.map] = Maybe.Just.map;
Maybe.Just.prototype[FL.map] = Maybe.Just.prototype.map;

// Maybe.Just Apply
Maybe.Just[FL.ap] = Maybe.Just.ap;
Maybe.Just.prototype[FL.ap] = Maybe.Just.prototype.ap;


// Nothing Applicative
Maybe.Nothing[FL.of] = Maybe.Nothing.of;

// Maybe.Nothing Chain
Maybe.Nothing[FL.chain] = Maybe.Nothing.chain;

// Maybe.Nothing Functor
Maybe.Nothing[FL.map] = Maybe.Nothing.map;

// Maybe.Nothing Apply
Maybe.Nothing[FL.ap] = Maybe.Nothing.ap;


export default Maybe;
