class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}

export default AppError;
