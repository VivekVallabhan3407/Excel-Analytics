const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); // existing middleware
const requireAdmin = require('../middleware/requireAdmin'); // new middleware
const { register, login } = require('../controllers/authController');
const { forgotPassword, resetPassword } = require('../controllers/authController');
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/register', register);
router.post('/login', login);


// ✅ Add this new route here:
router.post('/verify-pin', (req, res) => {
  const { pin } = req.body;
  if (pin === process.env.ADMIN_PIN) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ message: 'Invalid PIN' });
  }
});

module.exports = router;

