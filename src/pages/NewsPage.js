// src/pages/NewsPage/NewsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // Import custom hook
import './NewsPage.css'; // Import CSS

function NewsPage() {
  // Gọi useFetch hook để lấy dữ liệu tin tức từ API
  const { data: news, loading, error } = useFetch('http://localhost:3001/api/news');

  // Hiển thị thông báo loading khi đang tải
  if (loading) {
    return <div className="loading">Đang tải tin tức...</div>;
  }

  // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi gọi API
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
              <h2 className='news-title'>{article.title}</h2>
            </Link>
            <p className="news-excerpt">{article.excerpt}</p> {/* Mô tả ngắn */}
            {/* Thêm các thông tin khác nếu cần (ví dụ: ngày đăng) */}
          </article>
        ))}
      </div>
    </div>
  );
}

export default NewsPage;