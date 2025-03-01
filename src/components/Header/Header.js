// frontend/src/components/Header/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Sử dụng NavLink thay vì Link
import './Header.css'; // Import file CSS (nếu có)

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <NavLink to="/"> {/* Liên kết đến trang chủ */}
          {/* Thay thế bằng logo của bạn */}
          <img src="/logo.svg" alt="Logo" /> 
        </NavLink>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/"  className={({ isActive }) => (isActive ? "active" : "")}>
              Trang chủ
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/products"  className={({ isActive }) => (isActive ? "active" : "")}>
              Sản phẩm
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news"  className={({ isActive }) => (isActive ? "active" : "")}>
              Tin tức
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              Giới thiệu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact"  className={({ isActive }) => (isActive ? "active" : "")}>
              Liên hệ
            </NavLink>
          </li>
          {/* Thêm các liên kết khác (nếu cần) */}
        </ul>
      </nav>

        {/* (Tùy chọn) Thêm các phần tử khác, ví dụ: nút đăng nhập, giỏ hàng, ... */}
    </header>
  );
}

export default Header;