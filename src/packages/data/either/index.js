import FL from 'fantasy-land';
import Either from './Either';

// Either Applicative
Either[FL.of] = Either.of;

// Either Chain
Either[FL.chain] = Either.chain;
Either.prototype[FL.chain] = Either.prototype.chain;

// Either Functor
Either[FL.map] = Either.map;
Either.prototype[FL.map] = Either.prototype.map;

// Either Apply
Either[FL.ap] = Either.ap;
Either.prototype[FL.ap] = Either.prototype.ap;


// Right Applicative
Either.Right[FL.of] = Either.Right.of;
Either.Right.prototype[FL.of] = Either.Right.prototype.of;

// Either.Right Chain
Either.Right[FL.chain] = Either.Right.chain;
Either.Right.prototype[FL.chain] = Either.Right.prototype.chain;

// Either.Right Functor
Either.Right[FL.map] = Either.Right.map;
Either.Right.prototype[FL.map] = Either.Right.prototype.map;

// Either.Right Apply
Either.Right[FL.ap] = Either.Right.ap;
Either.Right.prototype[FL.ap] = Either.Right.prototype.ap;


// Left Applicative
Either.Left[FL.of] = Either.Left.of;
Either.Left.prototype[FL.of] = Either.Left.prototype.of;

// Either.Left Chain
Either.Left[FL.chain] = Either.Left.chain;
Either.Left.prototype[FL.chain] = Either.Left.prototype.chain;

// Either.Left Functor
Either.Left[FL.map] = Either.Left.map;
Either.Left.prototype[FL.map] = Either.Left.prototype.map;

// Either.Left Apply
Either.Left[FL.ap] = Either.Left.ap;
Either.Left.prototype[FL.ap] = Either.Left.prototype.ap;


export default Either;
