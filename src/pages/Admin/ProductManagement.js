// admin/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import useFetch from '../../frontend/src/hooks/useFetch';
import './ProductManagement.css';

function ProductManagement() {
  const { data: products, loading, error } = useFetch('http://localhost:3001/api/products');

  if (loading) {
    return <div className="loading">Đang tải danh sách sản phẩm...</div>;
  }

  if (error) {
    return <div className="error">Lỗi: {error.message}</div>;
  }

  return (
    <div className="product-management">
      <h1>Quản lý sản phẩm</h1>
      <button>Thêm sản phẩm</button>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <img src={product.image} alt={product.name} className="product-image" />
              </td>
              <td>
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;