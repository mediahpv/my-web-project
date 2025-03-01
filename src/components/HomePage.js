// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Nếu cần liên kết đến các trang khác
import './HomePage.css'; // Import CSS

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Tên Doanh Nghiệp Của Bạn</h1>
          <p>Mô tả ngắn gọn về doanh nghiệp/sản phẩm/dịch vụ.</p>
          <Link to="/products" className="cta-button">Khám phá Sản phẩm</Link>
          {/* hoặc */}
          {/* <button className="cta-button">Liên hệ Ngay</button> */}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Sản phẩm Nổi bật</h2>
        <div className="product-list">
          {/* Ví dụ sản phẩm (lặp lại) */}
          <div className="product-item">
            <img src="product1.jpg" alt="Sản phẩm 1" />
            <h3>Sản phẩm 1</h3>
            <p>Mô tả ngắn.</p>
            <Link to="/products/1">Xem chi tiết</Link>
          </div>
            <div className="product-item">
            <img src="product1.jpg" alt="Sản phẩm 2" />
            <h3>Sản phẩm 2</h3>
            <p>Mô tả ngắn.</p>
            <Link to="/products/2">Xem chi tiết</Link>
          </div>
          {/* ... thêm các sản phẩm khác ... */}
        </div>
      </section>

      {/* About Us (Short) */}
      <section className="about-us-short">
        <h2>Về Chúng Tôi</h2>
        <p>
          Giới thiệu ngắn gọn về doanh nghiệp, lịch sử, sứ mệnh, giá trị cốt lõi...
        </p>
        <Link to="/about">Tìm hiểu thêm</Link>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Bạn đã sẵn sàng?</h2>
        <p>Hãy liên hệ với chúng tôi ngay hôm nay!</p>
        <Link to="/contact" className="cta-button">Liên hệ</Link>
      </section>

        {/* News/Blog Teaser (optional) */
          <section className="news-teaser">
            <h2>Tin tức mới nhất</h2>
                <div className="news-list">
                <div className="news-item">
                    <img src="news1.jpg" alt="Bài viết 1" />
                    <h3><Link to="/news/1">Tiêu đề bài viết 1</Link></h3>
                    <p>Mô tả ngắn...</p>
                </div>
                </div>
           </section>
        }
    </div>
  );
}

export default HomePage;