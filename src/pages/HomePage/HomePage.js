// src/pages/HomePage/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // Import useFetch
import './HomePage.css';
//import heroImage from './hero-background.jpg'; // Cách 2: Import ảnh

function HomePage() {
  // Gọi API để lấy danh sách sản phẩm (tất cả)
  const { data: products, loading: productsLoading, error: productsError } = useFetch('http://localhost:3001/api/products');

  // Gọi API để lấy danh sách tin tức
  const { data: news, loading: newsLoading, error: newsError } = useFetch('http://localhost:3001/api/news');

  // Lọc ra 3 sản phẩm nổi bật (ví dụ: 3 sản phẩm đầu tiên)
  const featuredProducts = products ? products.slice(0, 3) : [];

  // Lọc ra 3 bài viết mới nhất (ví dụ)
  const latestNews = news ? news.slice(0, 3) : [];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        {/* Cách 1: Ảnh trong public/images */}
        <div className="hero-content">
          <h1>Tên Doanh Nghiệp Của Bạn</h1>
          <p>Mô tả ngắn gọn về doanh nghiệp/sản phẩm/dịch vụ.</p>
          <Link to="/products" className="cta-button">Khám phá Sản phẩm</Link>
        </div>

        {/* Cách 2: Import ảnh
        <div className="hero-content" style={{ backgroundImage: `url(${heroImage})` }}>
           <h1>...</h1>
        </div>
         */}
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Sản phẩm Nổi bật</h2>
        {productsLoading ? (
          <div className="loading">Đang tải sản phẩm...</div>
        ) : productsError ? (
          <div className="error">Lỗi: {productsError.message}</div>
        ) : (
          <div className="product-list">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                </Link>
                <p className='product-price'>Giá: {product.price} $</p>
              </div>
            ))}
          </div>
        )}
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

      {/* News/Blog Teaser */}
      <section className="news-teaser">
        <h2>Tin tức mới nhất</h2>
        {newsLoading ? (
          <div className="loading">Đang tải tin tức...</div>
        ) : newsError ? (
          <div className="error">Lỗi: {newsError.message}</div>
        ) : (
          <div className="news-list">
            {latestNews.map((article) => (
              <article key={article.id} className="news-item">
                <Link to={`/news/${article.id}`}>
                  <img src={article.image} alt={article.title} className="news-image" />
                  <h3 className="news-title">{article.title}</h3>
                </Link>
                <p className="news-excerpt">{article.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;