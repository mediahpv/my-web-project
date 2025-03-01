// src/pages/NewsDetail/NewsDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DOMPurify from 'dompurify'; // Import dompurify
import './NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();
  const { data: article, loading, error } = useFetch(`http://localhost:3001/api/news/${id}`);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  if (!article) {
    return <div className="not-found">Không tìm thấy bài viết.</div>;
  }

  return (
    <article className="news-detail">
      <header>
        <h1 className="article-title">{article.title}</h1>
        <p className="article-meta">
          Đăng bởi: <span className="article-author">{article.author}</span> vào{' '}
          {/* Format ngày tháng */}
          <time dateTime={article.date} className="article-date">
            {new Date(article.date).toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      </header>
      {/* Hiển thị ảnh (nếu có) */}
      {article.image && (
        <img src={article.image} alt={article.title} className="article-image" />
      )}
      {/* Hiển thị nội dung (đã được sanitize) */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
      />
        {/* Thêm comment tiếng việt */}
    </article>
  );
}

export default NewsDetail;