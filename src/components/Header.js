// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Sử dụng NavLink
import './Header.css'; // Import file CSS
import logo from '../logo.svg'; // Import logo (giả sử file logo.svg nằm trong thư mục src)

function Header() {
  return (
    <header className="header"> {/* Thêm className để dễ style */}
      <div className='logo-wraper'>
        <img src={logo} alt="Logo" className="header-logo" /> {/* Thêm logo */}
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="nav-item"><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Trang chủ</NavLink></li> {/* Sử dụng NavLink và activeClassName */}
          <li className="nav-item"><NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>Giới thiệu</NavLink></li>
          <li className="nav-item"><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Sản phẩm</NavLink></li>
          <li className="nav-item"><NavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>Tin tức</NavLink></li>
          <li className="nav-item"><NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Liên hệ</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;