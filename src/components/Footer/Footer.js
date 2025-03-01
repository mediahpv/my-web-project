// frontend/src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom'; // Nếu cần liên kết đến các trang khác
import './Footer.css'; // Import file CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> {/* Icon (Font Awesome) */}
            123 Đường ABC, Thành phố XYZ, Việt Nam
          </p>
          <p>
            <i className="fas fa-phone"></i> {/* Icon */}
            (+84) 123 456 789
          </p>
          <p>
            <i className="fas fa-envelope"></i> {/* Icon */}
            <a href="mailto:info@example.com">info@example.com</a> {/* Liên kết email */}
          </p>
        </div>

        <div className="footer-section">
          <h3>Kết nối</h3>
          <ul className="social-links">
            <li>
              <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i> {/* Icon Facebook */}
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> {/* Icon Twitter */}
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> {/* Icon Instagram */}
                Instagram
              </a>
            </li>
            {/* Thêm các liên kết mạng xã hội khác nếu cần */}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Thông tin</h3>
          <ul className="footer-links">
            <li><Link to="/about">Về chúng tôi</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/news">Tin tức</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
            <li><Link to="/privacy">Chính sách bảo mật</Link></li> {/* Thêm nếu có */}
            <li><Link to="/terms">Điều khoản sử dụng</Link></li> {/* Thêm nếu có */}
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Tên Doanh Nghiệp Của Bạn. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;