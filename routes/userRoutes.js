// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware')

// Lấy danh sách tất cả người dùng (thường chỉ dành cho admin)
// GET /api/users
router.get('/', isAuthenticated, isAdmin, userController.getAllUsers);

// Lấy thông tin chi tiết của một người dùng (theo ID)
// GET /api/users/:id
router.get('/:id', isAuthenticated, userController.getUserById);

// Tạo người dùng mới (thường sẽ do authController xử lý)
// POST /api/users
// router.post('/', userController.createUser); // <-- Thường thì việc tạo user (đăng ký) sẽ nằm trong authRoutes

// Cập nhật thông tin người dùng
// PUT /api/users/:id
router.put('/:id', isAuthenticated, userController.updateUser);

// Thay đổi mật khẩu
router.put('/:id/password', isAuthenticated, userController.changePassword)

// Xóa người dùng
// DELETE /api/users/:id
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;