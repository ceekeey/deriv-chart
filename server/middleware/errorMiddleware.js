function errorMiddleware(err, req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
}

module.exports = errorMiddleware;
