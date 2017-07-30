import FL from 'fantasy-land';
import Result from './Result';

// Result Applicative
Result[FL.of] = Result.of;

// Result Chain
Result[FL.chain] = Result.chain;
Result.prototype[FL.chain] = Result.prototype.chain;

// Result Functor
Result[FL.map] = Result.map;
Result.prototype[FL.map] = Result.prototype.map;

// Result Apply
Result[FL.ap] = Result.ap;
Result.prototype[FL.ap] = Result.prototype.ap;


// Success Applicative
Result.Success[FL.of] = Result.Success.of;
Result.Success.prototype[FL.of] = Result.Success.prototype.of;

// Result.Success Chain
Result.Success[FL.chain] = Result.Success.chain;
Result.Success.prototype[FL.chain] = Result.Success.prototype.chain;

// Result.Success Functor
Result.Success[FL.map] = Result.Success.map;
Result.Success.prototype[FL.map] = Result.Success.prototype.map;

// Result.Success Apply
Result.Success[FL.ap] = Result.Success.ap;
Result.Success.prototype[FL.ap] = Result.Success.prototype.ap;


// Failure Applicative
Result.Failure[FL.of] = Result.Failure.of;
Result.Failure.prototype[FL.of] = Result.Failure.prototype.of;

// Result.Failure Chain
Result.Failure[FL.chain] = Result.Failure.chain;
Result.Failure.prototype[FL.chain] = Result.Failure.prototype.chain;

// Result.Failure Functor
Result.Failure[FL.map] = Result.Failure.map;
Result.Failure.prototype[FL.map] = Result.Failure.prototype.map;

// Result.Failure Apply
Result.Failure[FL.ap] = Result.Failure.ap;
Result.Failure.prototype[FL.ap] = Result.Failure.prototype.ap;


export default Result;
