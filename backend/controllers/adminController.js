const User = require('../models/User'); // Make sure path is correct

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // Get all users
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

