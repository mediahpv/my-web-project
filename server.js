// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Import thư viện path

// Load environment variables (từ file .env ở thư mục gốc)
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối MongoDB (sử dụng Mongoose)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Import routes
        const authRoutes = require('./routes/authRoutes');
        const userRoutes = require('./routes/userRoutes');
        const productRoutes = require('./routes/productRoutes');
        const orderRoutes = require('./routes/orderRoutes');
        const newsRoutes = require('./routes/newsRoutes');

        // Sử dụng routes
        app.use('/api/auth', authRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/products', productRoutes);
        app.use('/api/orders', orderRoutes);
        app.use('/api/news', newsRoutes);

        // Xử lý lỗi 404 (Not Found)
        app.use((req, res, next) => {
            res.status(404).json({ message: 'Not Found' });
        });

        // Middleware xử lý lỗi chung (error handler)
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: err.message || 'Internal Server Error' });
        });

        // Khởi động server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được database
    });
