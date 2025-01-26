// export const asyncHandler = (requestHandler) => (req, res, next) => {
//   Promise.resolve(requestHandler(req, res, next)).catch(next);
// };

// we are using asyncHandler to handle async functions in our controllers. 
// This is a common pattern in Express.js applications. 
// The asyncHandler function takes a requestHandler function as an argument and returns a new function
//  that takes req, res, and next as arguments.
//  The new function calls the requestHandler function with req, res,
//  and next as arguments and wraps it in a Promise.resolve() call. 
// If the requestHandler function throws an error, 
// the catch block will catch it and pass it to the next middleware function in the chain. 
// This allows us to write cleaner and more concise code in our controllers.

export const asyncHandler = (requestHandler) => {
  const wrapper = (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
  return wrapper;
};
