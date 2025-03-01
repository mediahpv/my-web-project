// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 1. Lấy danh sách tất cả sản phẩm
// GET /api/products
router.get('/', productController.getAllProducts);

// 2. Lấy thông tin chi tiết của một sản phẩm (theo ID)
// GET /api/products/:id
router.get('/:id', productController.getProductById);

// 3. Tạo sản phẩm mới
// POST /api/products
router.post('/', productController.createProduct);

// 4. Cập nhật thông tin sản phẩm
// PUT /api/products/:id
router.put('/:id', productController.updateProduct);

// 5. Xóa sản phẩm
// DELETE /api/products/:id
router.delete('/:id', productController.deleteProduct);

module.exports = router;