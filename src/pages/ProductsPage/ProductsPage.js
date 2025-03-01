// src/pages/ProductsPage/ProductsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'; // Import custom hook
import './ProductsPage.css'; // Import CSS

function ProductsPage() {
  // Gọi useFetch hook để lấy dữ liệu sản phẩm từ API
  const { data: products, loading, error } = useFetch('http://localhost:3001/api/products');

  // Hiển thị thông báo khi đang tải dữ liệu
  if (loading) {
    return <div className="loading">Đang tải sản phẩm...</div>;
  }

  // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi gọi API
  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  // Hiển thị danh sách sản phẩm khi đã có dữ liệu
  return (
    <div className="products-page">
      <h1>Sản phẩm của chúng tôi</h1>
      <div className="product-list">
        {products.map((product) => ( // Duyệt qua mảng products
          <div key={product.id} className="product-item">
            <Link to={`/products/${product.id}`}> {/* Liên kết đến trang chi tiết sản phẩm */}
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className='product-name'>{product.name}</h3>
            </Link>
            <p className='product-price'>Giá: ${product.price}</p> {/* Hiển thị giá */}
            {/* Bạn có thể thêm các thông tin khác ở đây, ví dụ: mô tả ngắn */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;