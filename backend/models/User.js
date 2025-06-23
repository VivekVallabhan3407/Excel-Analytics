const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  dob: Date,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  lastLogin: Date,
  files: { type: Number, default: 0 },
  charts: { type: Number, default: 0 },
  totalSize: { type: Number, default: 0 }, // size in bytes
  resetPasswordToken: String,
  resetPasswordExpires: Date,},{timestamps:true
});

module.exports = mongoose.model("User", userSchema);
