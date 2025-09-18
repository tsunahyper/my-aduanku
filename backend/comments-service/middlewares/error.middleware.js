export default function errorMiddleware(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || 'Server Error';
    if (process.env.NODE_ENV !== 'test') console.error(err);
    res.status(status).json({ success: false, message });
  }