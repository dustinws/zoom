import FL from 'fantasy-land';
import Validation from './Validation';

// Validation Applicative
Validation[FL.of] = Validation.of;

// Validation Chain
Validation[FL.chain] = Validation.chain;
Validation.prototype[FL.chain] = Validation.prototype.chain;

// Validation Functor
Validation[FL.map] = Validation.map;
Validation.prototype[FL.map] = Validation.prototype.map;

// Validation Apply
Validation[FL.ap] = Validation.ap;
Validation.prototype[FL.ap] = Validation.prototype.ap;

// Validation Semigroup
Validation[FL.concat] = Validation.concat;
Validation.prototype[FL.concat] = Validation.prototype.concat;

// Validation Monoid
Validation[FL.empty] = Validation.empty;


// Success Applicative
Validation.Success[FL.of] = Validation.Success.of;
Validation.Success.prototype[FL.of] = Validation.Success.prototype.of;

// Success Chain
Validation.Success[FL.chain] = Validation.Success.chain;
Validation.Success.prototype[FL.chain] = Validation.Success.prototype.chain;

// Success Functor
Validation.Success[FL.map] = Validation.Success.map;
Validation.Success.prototype[FL.map] = Validation.Success.prototype.map;

// Success Apply
Validation.Success[FL.ap] = Validation.Success.ap;
Validation.Success.prototype[FL.ap] = Validation.Success.prototype.ap;

// Success Semigroup
Validation.Success[FL.concat] = Validation.Success.concat;
Validation.Success.prototype[FL.concat] = Validation.Success.prototype.concat;


// Failure Applicative
Validation.Failure[FL.of] = Validation.Failure.of;
Validation.Failure.prototype[FL.of] = Validation.Failure.prototype.of;

// Failure Chain
Validation.Failure[FL.chain] = Validation.Failure.chain;
Validation.Failure.prototype[FL.chain] = Validation.Failure.prototype.chain;

// Failure Functor
Validation.Failure[FL.map] = Validation.Failure.map;
Validation.Failure.prototype[FL.map] = Validation.Failure.prototype.map;

// Failure Apply
Validation.Failure[FL.ap] = Validation.Failure.ap;
Validation.Failure.prototype[FL.ap] = Validation.Failure.prototype.ap;

// Failure Semigroup
Validation.Failure[FL.concat] = Validation.Failure.concat;
Validation.Failure.prototype[FL.concat] = Validation.Failure.prototype.concat;


export default Validation;
