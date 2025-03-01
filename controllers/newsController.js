// backend/controllers/newsController.js
const fs = require('fs').promises;
const path = require('path');

const newsFilePath = path.join(__dirname, '../news.json');

// Helper function để đọc dữ liệu từ news.json
const readNewsFile = async () => {
  try {
    const data = await fs.readFile(newsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; // Trả về mảng rỗng nếu file không tồn tại
    }
    throw error;
  }
};

// Helper function để ghi dữ liệu vào news.json
const writeNewsFile = async (data) => {
  await fs.writeFile(newsFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// 1. Lấy danh sách tất cả tin tức
exports.getAllNews = async (req, res) => {
  try {
    const news = await readNewsFile();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 2. Lấy thông tin chi tiết của một bài viết (theo ID)
exports.getNewsById = async (req, res) => {
  try {
    const news = await readNewsFile();
    const newsId = parseInt(req.params.id);
    const article = news.find(n => n.id === newsId);

    if (!article) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 3. Tạo bài viết mới
exports.createNews = async (req, res) => {
  try {
    const news = await readNewsFile();
    const newArticle = req.body;

    // Validate data (kiểm tra dữ liệu đầu vào) - Rất quan trọng!
    if (!newArticle.title || !newArticle.content || !newArticle.author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Tạo ID mới cho bài viết (TẠM THỜI)
    newArticle.id = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
    newArticle.date = new Date().toISOString(); // Thêm ngày tạo

    // Thêm bài viết mới vào mảng
    news.push(newArticle);

    // Ghi dữ liệu vào file
    await writeNewsFile(news);

    res.status(201).json(newArticle);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 4. Cập nhật bài viết
exports.updateNews = async (req, res) => {
  try {
    const news = await readNewsFile();
    const newsId = parseInt(req.params.id);
    const updatedArticleData = req.body;

    const articleIndex = news.findIndex(n => n.id === newsId);

    if (articleIndex === -1) {
      return res.status(404).json({ message: 'News article not found' });
    }

    // Cập nhật thông tin bài viết
    news[articleIndex] = {
      ...news[articleIndex], // Giữ lại các thông tin cũ
      ...updatedArticleData,   // Ghi đè các thông tin mới
    };

    // Ghi dữ liệu vào file
    await writeNewsFile(news);

    res.json(news[articleIndex]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// 5. Xóa bài viết
exports.deleteNews = async (req, res) => {
  try {
    const news = await readNewsFile();
    const newsId = parseInt(req.params.id);

    const articleIndex = news.findIndex(n => n.id === newsId);

    if (articleIndex === -1) {
      return res.status(404).json({ message: 'News article not found' });
    }

    // Xóa bài viết
    news.splice(articleIndex, 1);

    // Ghi dữ liệu vào file
    await writeNewsFile(news);

    res.status(204).send(); // 204 No Content

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};