const User = require('../models/User'); // Make sure path is correct

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
        totalSize: (totalSizeBytes / (1024 * 1024)).toFixed(2) 
      };
    }));

    res.json(enrichedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};