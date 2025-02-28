// src/components/NewsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // Import custom hook (nếu dùng)
import './NewsPage.css'; // Import CSS

function NewsPage() {
  // Gọi useFetch hook để lấy dữ liệu (hoặc dùng useState + useEffect)
   const { data: news, loading, error } = useFetch('http://localhost:3001/api/news'); // Thay đổi URL

  // Xử lý loading
  if (loading) {
    return <div className="loading">Đang tải tin tức...</div>;
  }

  // Xử lý error
  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  // Hiển thị danh sách bài viết
  return (
    <div className="news-page">
      <h1>Tin tức</h1>
      <div className="news-list">
        {news.map((article) => (
          <article key={article.id} className="news-item">
            <Link to={`/news/${article.id}`}>
              <img src={article.image} alt={article.title} className="news-image" />
              <h2 className="news-title">{article.title}</h2>
            </Link>
            <p className="news-excerpt">{article.excerpt}</p> {/* Mô tả ngắn */}
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;