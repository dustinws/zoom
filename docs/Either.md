`Either` is an abstraction around error handling that allows the user
to return their errors instead of throw them. `Either` is a super class
with two constructors, `Left` and `Right`. The `Right` constructor
represents a successful operation, and the `Left` constructor represents
an unsuccessful operation with an embedded error message. You can chain
functions that return `Either` instances by using `.chain` or `.andThen`.

---

#### Fantasy Land Implementations
`Applicative`, `Functor`, `Apply`, `Chain`, `Monad`

```JavaScript
import { Either } from 'zoomjs';

// Expose the constructors
const { Left, Right } = Either;

// `Either.try` is a convenience function that wraps functions
// that can potentially throw in an Either.
const parseJson = Either.try(JSON.parse);

// Ensure a user is an admin before going any further
const enforeAdminAccess = (user) => {
 if (!user.admin) {
   return Left('Must be an admin to continue');
 }

 return Right(user);
};

parseJson('{ "admin": false }')
 .andThen(enforceAdminAccess)
 .cata({
   Right(adminUser) {
     // Do something with the admin
   },

   Left(error) {
     // Handle the error
   },
 });
```
