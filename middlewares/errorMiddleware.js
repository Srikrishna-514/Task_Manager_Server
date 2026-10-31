const errorHandling = (err, req, res, next) => {
  // If the response was already sent, delegate to Express
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || err.status || 500;

  return res.status(statusCode).json({
    success: false,
    msg: err.message || "Internal Server Error",
    error: err.errors || null,
  });
};

module.exports = errorHandling;
