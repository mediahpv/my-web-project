// src/components/ProductsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'; // Import custom hook
import './ProductsPage.css'; // Import CSS

function ProductsPage() {
  // Gọi useFetch hook để lấy dữ liệu sản phẩm
  const { data: products, loading, error } = useFetch('http://localhost:3001/api/products'); // Thay đổi URL nếu cần

  // Xử lý trạng thái loading
  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  // Xử lý trạng thái lỗi
  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  // Hiển thị danh sách sản phẩm
  return (
    <div className="products-page">
      <h1>Sản phẩm của chúng tôi</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className='product-name'>{product.name}</h2>
            </Link>
            <p className='product-price'>Giá: {product.price} $</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;