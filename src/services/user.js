// frontend/src/services/user.js
import { getToken } from './auth'; // Import hàm getToken (nếu bạn lưu token ở localStorage)

const API_URL = 'http://localhost:3001/api/users'; // Thay đổi nếu backend của bạn chạy trên port khác

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

// Lấy danh sách tất cả người dùng (thường chỉ dành cho admin)
export const getAllUsers = async () => {
  try {
    return await fetchWithAuth(`${API_URL}`);
  } catch (error) {
    throw error; // Hoặc xử lý lỗi theo cách khác
  }
};

// Lấy thông tin chi tiết của một người dùng (theo ID)
export const getUserById = async (userId) => {
  try {
    return await fetchWithAuth(`${API_URL}/${userId}`);
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, updateData) => {
  try {
    return await fetchWithAuth(`${API_URL}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  } catch (error) {
    throw error;
  }
};
// Thay đổi mật khẩu
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const res = await fetchWithAuth(`${API_URL}/${userId}/password`, {
      method: "PUT",
      body: JSON.stringify({ oldPassword, newPassword })
    })
    return res
  } catch (error) {
    throw error
  }
}
// Xóa người dùng (thường chỉ dành cho admin)
export const deleteUser = async (userId) => {
  try {
    return await fetchWithAuth(`${API_URL}/${userId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw error;
  }
};

// (Tùy chọn) Lấy thông tin người dùng hiện tại (dựa vào token)
// export const getCurrentUser = async () => {
//   try {
//     return await fetchWithAuth(`${API_URL}/me`); // Giả sử có API endpoint /api/users/me
//   } catch (error) {
//     throw error;
//   }
// };

// Các hàm khác liên quan đến quản lý người dùng (nếu cần) ...