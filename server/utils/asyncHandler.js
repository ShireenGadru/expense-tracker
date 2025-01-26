// export const asyncHandler = (requestHandler) => (req, res, next) => {
//   Promise.resolve(requestHandler(req, res, next)).catch(next);
// };

export const asyncHandler = (requestHandler) => {
  const wrapper = (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
  return wrapper;
};
