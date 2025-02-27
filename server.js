// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Thêm body-parser
const newsData = require('./news.json');
const productsData = require('./products.json');

const app = express();
const port = 3001;

// Sử dụng middleware cors
app.use(cors());
// Sử dụng body-parser để xử lý dữ liệu gửi lên từ form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API cho tin tức
app.get('/api/news', (req, res) => {
    // Lấy danh sách tin tức
  res.json(newsData);
});

app.get('/api/news/:id', (req, res) => {
     // Lấy chi tiết tin tức theo ID
  const articleId = parseInt(req.params.id);
  const article = newsData.find(item => item.id === articleId);

  if (!article) {
    return res.status(404).json({ message: 'Không tìm thấy tin tức' });
  }
  res.json(article);
});

// API cho sản phẩm
app.get('/api/products', (req, res) => {
    // Lấy danh sách sản phẩm
  res.json(productsData);
});

app.get('/api/products/:id', (req, res) => {
    // Lấy chi tiết sản phẩm theo ID
  const productId = parseInt(req.params.id);
  const product = productsData.find(item => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
  res.json(product);
});

// API cho form liên hệ (ContactPage)
app.post('/api/contact', (req, res) => {
    // Xử lý dữ liệu từ form liên hệ
  const { name, email, message } = req.body;

  // TODO: Xử lý dữ liệu (ví dụ: gửi email, lưu vào database, ...)
  // Ở đây, tôi chỉ log ra console để ví dụ
  console.log('Dữ liệu từ form liên hệ:', { name, email, message });

  // Trả về phản hồi cho client
  res.json({ message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' });
});

// Middleware xử lý lỗi chung (chi tiết hơn)
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Trả về mã lỗi và thông báo cụ thể hơn
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message }); // Lỗi validation
  }

  res.status(500).json({ message: 'Đã có lỗi xảy ra ở phía server!' }); // Lỗi server chung
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});