// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true, // Loại bỏ khoảng trắng thừa
        lowercase: true, // Chuyển thành chữ thường
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'], // Validate email format
      },
      role: {
        type: String,
        enum: ['admin', 'user', 'editor'], // Thêm các role khác nếu cần
        default: 'user',
      },
      firstName: { type: String },
      lastName: { type: String },
      address: { type: String },
      phone: { type: String },
  // ... Thêm các trường khác nếu cần ...
}, { timestamps: true });

// Hash password trước khi lưu vào database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // 10 là độ mạnh của salt (salt rounds)
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Phương thức để kiểm tra password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try{
    return await bcrypt.compare(candidatePassword, this.password);
  }catch (error) {
        throw new Error('Error compare password: ' + error.message);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;