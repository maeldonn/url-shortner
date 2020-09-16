const notFound = (req, res, next) => {
  res.status(404);
  // TODO: Send 404 page
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  if (process.env.NODE_ENV === 'production') {
    res.json({ message: err.message });
  } else {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = {
  notFound,
  errorHandler,
};
