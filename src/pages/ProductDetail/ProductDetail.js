// src/pages/ProductDetail/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // Import custom hook
import './ProductDetail.css'; // Import CSS

function ProductDetail() {
  // Lấy id sản phẩm từ URL
  const { id } = useParams();

  // Gọi API để lấy thông tin chi tiết sản phẩm
  const { data: product, loading, error } = useFetch(`http://localhost:3001/api/products/${id}`);

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return <div className="loading">Đang tải thông tin sản phẩm...</div>;
  }

  // Hiển thị lỗi nếu có lỗi xảy ra khi gọi API
  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  // Hiển thị thông báo nếu không tìm thấy sản phẩm (404)
  if (!product) {
    return <div className="not-found">Không tìm thấy sản phẩm</div>;
  }

  // Hiển thị thông tin chi tiết sản phẩm
  return (
    <div className="product-detail">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="product-price">Giá: ${product.price}</p>
        <p className="product-description">{product.description}</p>
        {/* Thêm các thông tin khác (tùy chọn) */}
        {product.sizes && (
          <p>
            Kích cỡ: {product.sizes.join(', ')} 
          </p>
        )}
         {product.colors && (
          <p>
            Màu sắc: {product.colors.join(', ')} 
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;