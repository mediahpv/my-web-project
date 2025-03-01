// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService')

// Tạo JWT
const generateToken = (user) => {
  const payload = {
    id: user._id, // Sử dụng _id của MongoDB
    username: user.username,
    role: user.role,
  };

  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
};

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Tạo user mới (password đã được hash trong model)
    const newUser = new User({ username, password, email });
    await newUser.save();

    // Tạo token
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user
    const user = await userService.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Kiểm tra password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tạo token
    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
exports.logout = (req, res) => {
  // Ở phía client (frontend), bạn chỉ cần xóa token (localStorage, cookie, ...)
  res.status(200).json({ message: 'Logged out successfully' });
}