import AppError from "./AppError.js";

const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((error) => error.message);
    return res
      .status(400)
      .json({ error: "Validation Error", message: messages });
  }

  const status = err.status || 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  res.status(status).json({ error: message, err: err });
};

export default errorHandler;
