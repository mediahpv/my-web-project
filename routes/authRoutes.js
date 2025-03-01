// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đăng ký (Register)
// POST /api/auth/register
router.post('/register', authController.register);

// Đăng nhập (Login)
// POST /api/auth/login
router.post('/login', authController.login);

// Đăng xuất (Logout) - Không bắt buộc với JWT, xử lý ở frontend
// GET /api/auth/logout
router.get('/logout', authController.logout)

module.exports = router;