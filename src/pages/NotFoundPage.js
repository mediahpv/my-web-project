// src/components/NotFoundPage/NotFoundPage.js
import React from 'react';
import './NotFoundPage.css'; // Import file CSS (tùy chọn)

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <h2>Không Tìm Thấy Trang</h2>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <p>
        Bạn có thể quay lại <a href="/">trang chủ</a>.
      </p>
    </div>
  );
}

export default NotFoundPage;