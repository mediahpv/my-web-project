// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model

// Middleware để kiểm tra xem người dùng đã đăng nhập chưa (có JWT hợp lệ không)
exports.isAuthenticated = async (req, res, next) => {
  try {
    // 1. Lấy token từ header (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1]; // Lấy phần token (bỏ qua "Bearer ")

    // 2. Verify token (giải mã và kiểm tra tính hợp lệ)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token

    // 3. Tìm user dựa trên thông tin trong token (ví dụ: ID)
    const user = await User.findById(decoded.id).select('-password'); // Tìm user trong database
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    // 4. Gắn thông tin user vào req object để các middleware/handler khác có thể sử dụng
    req.user = user;

    // 5. Chuyển quyền điều khiển cho middleware/handler tiếp theo
    next();
  } catch (error) {
    // Nếu token không hợp lệ (hết hạn, sai secret key, ...), hoặc có lỗi khác
    console.error(error);
     if (error.name === 'TokenExpiredError') {
       return res.status(401).json({ message: 'Unauthorized: Token expired' });
     }
      if(error.name === "JsonWebTokenError"){
        return res.status(401).json({message: "Unauthorized: Invalid token"})
      }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware để kiểm tra xem người dùng có phải là admin không
exports.isAdmin = (req, res, next) => {
  // req.user đã được middleware isAuthenticated đưa vào
  if (req.user && req.user.role === 'admin') {
    next(); // Cho phép đi tiếp
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' }); // 403 Forbidden
  }
};

//(Optional) Middleware check permission user.