// backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI; // Lấy connection string từ biến môi trường

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Bạn có thể thêm các options khác nếu cần:
      // useCreateIndex: true, // (Không cần thiết với phiên bản Mongoose mới)
      // useFindAndModify: false, // (Không cần thiết với phiên bản Mongoose mới)
    });

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được database
  }
};

module.exports = connectDB;