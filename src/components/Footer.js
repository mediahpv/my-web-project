// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Nếu có liên kết đến các trang khác
import './Footer.css'; // Import file CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <section className="footer-section">
          {/* Thông tin liên hệ */}
          <h3>Liên hệ</h3>
          <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
          <p>Điện thoại: (123) 456-7890</p>
          <p>Email: info@mycompany.com</p>
        </section>

        <section className="footer-section">
          {/* Liên kết mạng xã hội (ví dụ) */}
          <h3>Kết nối</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com/mycompany" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com/mycompany" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com/mycompany" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </section>

        <section className="footer-section">
          {/* Các liên kết khác (ví dụ) */}
          <h3>Khác</h3>
          <ul>
            <li><Link to="/terms">Điều khoản</Link></li>
            <li><Link to="/privacy">Chính sách bảo mật</Link></li>
          </ul>
        </section>
      </div>

      <div className="footer-copyright">
        {/* Bản quyền */}
        <p>&copy; 2023 My Awesome Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;