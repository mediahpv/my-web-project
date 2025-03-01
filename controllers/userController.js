// backend/controllers/userController.js
const userService = require('../services/userService');

// Lấy danh sách tất cả người dùng (thường chỉ dành cho admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    // Xử lý lỗi tốt hơn: trả về đúng status code và message
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin chi tiết của một người dùng (theo ID)
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    // Xử lý lỗi tốt hơn:  404 Not Found nếu không tìm thấy user
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Tạo người dùng mới - Không dùng ở đây, dùng register trong authController
// exports.createUser = async (req, res) => { ... }

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    // TẠM THỜI: Giả sử người dùng đã được xác thực và thông tin được đưa vào req.user
    // Sau này, bạn sẽ dùng middleware để làm việc này
    const requestingUser = req.user;

    const updatedUser = await userService.updateUser(userId, updateData, requestingUser);
    res.json(updatedUser);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Thay đổi mật khẩu
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    // TẠM THỜI: Giả sử đã xác thực
    const requestingUser = req.user;
    const result = await userService.changePassword(id, oldPassword, newPassword, requestingUser)
    res.status(200).json(result)
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Incorrect old password') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestingUser = req.user; // Giả sử đã xác thực
    await userService.deleteUser(userId, requestingUser);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized') {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};