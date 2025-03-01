// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy danh sách tất cả người dùng (thường chỉ dành cho admin)
// GET /api/users
router.get('/', userController.getAllUsers);

// Lấy thông tin chi tiết của một người dùng (theo ID)
// GET /api/users/:id
router.get('/:id', userController.getUserById);

// Tạo người dùng mới (thường sẽ do authController xử lý)
// POST /api/users
// router.post('/', userController.createUser); // <-- Thường thì việc tạo user (đăng ký) sẽ nằm trong authRoutes

// Cập nhật thông tin người dùng
// PUT /api/users/:id
router.put('/:id', userController.updateUser);

// Xóa người dùng
// DELETE /api/users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;