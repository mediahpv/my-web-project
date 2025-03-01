// backend/services/authService.js

// TẠM THỜI: Import từ controller (vì chưa có database)
const { register, login } = require('../controllers/authController');

// Đăng ký người dùng mới
exports.registerUser = async (username, password, email) => {
  try {
    // Gọi hàm register từ controller (TẠM THỜI)
    // Sau này, bạn có thể chuyển phần lớn logic (validate, hash password, ...)
    // từ controller sang đây.
    const result = await register(username, password, email)
    return result
  } catch (error) {
     throw error
  }
};

// Đăng nhập
exports.loginUser = async (username, password) => {
  try {
    const result = await login(username, password)
    return result
  } catch (error) {
    throw error
  }
};

// (Tùy chọn) Xác minh token
exports.verifyToken = (token) => {
  // ... (code để verify JWT) ...
};

// (Tùy chọn) Các hàm khác (forgot password, reset password, ...)