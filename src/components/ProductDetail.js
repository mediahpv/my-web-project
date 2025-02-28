// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import CSS

function ProductDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết sản phẩm
    fetch(`http://localhost:3001/api/products/${id}`) // Thay thế bằng URL API thực tế
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
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

  if (!product) {
    return <div className="not-found">Không tìm thấy sản phẩm</div>; // Xử lý không tìm thấy
  }

  return (
    <article className="product-detail">
      <figure>
        <img src={product.image} alt={product.title} className="product-image" />
        {/* <figcaption>{product.title}</figcaption>  Nếu cần caption */}
      </figure>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">Giá: ${product.price}</p>
        <p className="product-description">{product.description}</p>
        {/* Thêm các thông tin khác */}
      </div>
    </article>
  );
}

export default ProductDetail;