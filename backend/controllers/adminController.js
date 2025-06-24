const User = require('../models/User');
const ExcelRecord = require('../models/ExcelRecord');
const SavedChart = require('../models/SavedCharts');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const enrichedUsers = await Promise.all(users.map(async (user) => {
      const [files, charts] = await Promise.all([
        ExcelRecord.find({ userId: user._id }),
        SavedChart.find({ userId: user._id })
      ]);
      const totalSizeBytes = files.reduce((sum, file) => sum + (file.size || 0), 0);
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        files: files.length,
        charts: charts.length,
        totalSize: totalSizeBytes
      };
    }));
    res.json(enrichedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (!['admin', 'user'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'Role updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete related charts/files
    await SavedChart.deleteMany({ userId: id });
    await ExcelRecord.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    res.json({ message: 'User and related data deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};