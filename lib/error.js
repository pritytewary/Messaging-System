const ErrorType = {
  BadRequestError: "BadRequestError",
  NotFoundError: "NotFoundError",
  UnauthorizedError: "UnauthorizedError",
  InternalServerError: "InternalServerError",
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = ErrorType.NotFoundError;
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = ErrorType.BadRequestError;
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = ErrorType.UnauthorizedError;
    this.statusCode = 401;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = ErrorType.InternalServerError;
    this.statusCode = 500;
  }
}

function errorHandler(err, res) {
  res.status(err.statusCode || 500).json({
    type: err.name || ErrorType.InternalServerError,
    message: err.message || "Internal Server Error",
  });
}

export {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  ErrorType,
  errorHandler,
};
