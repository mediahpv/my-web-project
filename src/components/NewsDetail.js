// src/components/NewsDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './NewsDetail.css'; // Import CSS

function NewsDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết bài viết
    fetch(`http://localhost:3001/api/news/${id}`) // Thay thế bằng URL API thực tế
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]); // Chạy lại useEffect khi id thay đổi

  if (loading) {
    return <div className="loading">Đang tải...</div>; // Hiển thị loading
  }

  if (error) {
    return <div className="error">Lỗi: {error}</div>; // Hiển thị lỗi
  }

  if (!article) {
    return <div className="not-found">Không tìm thấy bài viết</div>; // Xử lý không tìm thấy
  }

  return (
    <article className="news-detail">
      <header>
        <h2 className="article-title">{article.title}</h2> {/* Tiêu đề */}
      </header>
      {/* <img src={article.image} alt={article.title} /> Nếu có ảnh */}
      <p className="article-content">{article.content}</p> {/* Nội dung */}
      <p className="article-author">Tác giả: {article.author}</p> {/* Tác giả */}
      {/* <time dateTime={article.date}>{article.date}</time> Nếu có ngày tháng */}

    </article>
  );
}

export default NewsDetail;