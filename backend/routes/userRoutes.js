const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

module.exports = router;
