const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
UserSchema.path('username').validate((val) => {
  return /^[a-zA-Z0-9]+$/.test(val);
}, 'Invalid username format.');

UserSchema.path('email').validate((val) => {
  return /\S+@\S+\.\S+/.test(val);
}, 'Invalid email format.');
module.exports = mongoose.model('User', UserSchema);
const User = require('./models/User');
