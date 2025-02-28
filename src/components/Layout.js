// src/components/Layout.js
import React from 'react';
import Header from './Header'; // Import Header component
import Footer from './Footer'; // Import Footer component
import './Layout.css'; // Import file CSS (nếu cần)

function Layout({ children }) {
  return (
    <div className="layout"> {/* Thêm className để style (nếu cần) */}
      <Header /> {/* Hiển thị Header */}
      <main className="main-content">{children}</main> {/* Phần nội dung chính của từng trang */}
      <Footer /> {/* Hiển thị Footer */}
    </div>
  );
}

export default Layout;