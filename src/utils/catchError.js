/**
 * Catches errors thrown in handler functions and propagate them to the error middleware.
 */
module.exports = handler => {
  if (typeof handler !== 'function') {
    throw new Error(`Expected function, got ${typeof handler}`);
  }

  return (req, res, next) => {
    try {
      return Promise.resolve(handler(req, res, next)).catch(error => {
        next(error); // handle async function rejected promise
      });
    } catch (error) {
      next(error); // handle regular function thrown exception
    }
  };
};
