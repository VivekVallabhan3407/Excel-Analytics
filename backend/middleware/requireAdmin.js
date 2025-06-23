// backend/middleware/requireAdmin.js ✅ for backend
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};