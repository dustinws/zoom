import tupleOf from './tupleOf';

export default function guard(contracts) {
  return func => (...args) => {
    const returnType = contracts[contracts.length - 1];

    return tupleOf(contracts.slice(0, -1), args)
      .chain(() => returnType(func(...args)))
      .cata({
        Failure(error) {
          console.log('[CheckError]', error); // eslint-disable-line no-console
          return error;
        },
        Success(value) {
          return value;
        },
      });
  };
}
