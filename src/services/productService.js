// frontend/src/services/productService.js

import { getToken } from './auth'; // Import getToken (nếu cần xác thực)

const API_URL = 'http://localhost:3001/api/products'; // Thay đổi nếu backend của bạn chạy trên port khác

// Hàm hỗ trợ để gửi request kèm token (nếu cần)
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Thêm token vào header (nếu có)
    ...options.headers, // Gộp với các headers khác (nếu có)
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
};

// Lấy danh sách tất cả sản phẩm
export const getAllProducts = async () => {
  try {
    return await fetchWithAuth(API_URL);
  } catch (error) {
    throw error; // Hoặc xử lý lỗi theo cách khác (ví dụ: hiển thị thông báo lỗi)
  }
};

// Lấy thông tin chi tiết của một sản phẩm (theo ID)
export const getProductById = async (productId) => {
  try {
    return await fetchWithAuth(`${API_URL}/${productId}`);
  } catch (error) {
    throw error;
  }
};

// Tạo sản phẩm mới (thường chỉ dành cho admin)
export const createProduct = async (productData) => {
  try {
    return await fetchWithAuth(API_URL, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin sản phẩm (thường chỉ dành cho admin)
export const updateProduct = async (productId, updateData) => {
  try {
    return await fetchWithAuth(`${API_URL}/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  } catch (error) {
    throw error;
  }
};

// Xóa sản phẩm (thường chỉ dành cho admin)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetchWithAuth(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });
     // Kiểm tra nếu response là 204 No Content thì không cần parse JSON
    if (response.status === 204) {
        return null; // Hoặc return một giá trị nào đó để biểu thị thành công, ví dụ: { success: true }
    }
    return response.json()
  } catch (error) {
    throw error;
  }
};
// Tìm kiếm sản phẩm
export const searchProducts = async (query) => {
  try {
    const response = await fetchWithAuth(`${API_URL}?search=${query}`);
    return response
  } catch (error) {
    throw error
  }
};
// Lấy sản phẩm theo category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetchWithAuth(`${API_URL}?category=${category}`);
    return response
  } catch (error) {
    throw error
  }
};

// (Tùy chọn) Các hàm khác liên quan đến quản lý sản phẩm (ví dụ: lọc sản phẩm, sắp xếp, ...)