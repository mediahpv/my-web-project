// backend/routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Lấy danh sách tất cả tin tức
// GET /api/news
router.get('/', newsController.getAllNews);

// Lấy thông tin chi tiết của một bài viết (theo ID)
// GET /api/news/:id
router.get('/:id', newsController.getNewsById);

// Tạo bài viết mới
// POST /api/news
router.post('/', newsController.createNews);

// Cập nhật bài viết
// PUT /api/news/:id
router.put('/:id', newsController.updateNews);

// Xóa bài viết
// DELETE /api/news/:id
router.delete('/:id', newsController.deleteNews);

module.exports = router;