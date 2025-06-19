const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
 
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Error fetching profile' });
  }
});


router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, phone } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});
module.exports = router;
