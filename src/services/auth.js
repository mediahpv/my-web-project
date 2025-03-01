// frontend/src/services/auth.js

const API_URL = 'http://localhost:3001/api/auth'; // Thay đổi nếu backend của bạn chạy trên port khác

// Hàm gọi API đăng ký (register)
export const register = async (username, password, email) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data; // Thường sẽ trả về { token }
  } catch (error) {
    throw error;
  }
};

// Hàm gọi API đăng nhập (login)
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data; // Thường sẽ trả về { token }
  } catch (error) {
    throw error;
  }
};

// Hàm lưu trữ token vào localStorage (hoặc cookie)
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Hàm lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Hàm xóa token (khi logout)
export const removeToken = () => {
  localStorage.removeItem('token');
};

// (Tùy chọn) Hàm kiểm tra xem người dùng đã đăng nhập chưa
export const isLoggedIn = () => {
  const token = getToken();
  return !!token; // Trả về true nếu có token, false nếu không
};

// (Tùy chọn) Hàm lấy thông tin người dùng hiện tại (từ token)
// export const getCurrentUser = () => {
//   const token = getToken();
//   if (!token) {
//     return null;
//   }

//   try {
//     // Giải mã token (bạn có thể dùng thư viện jwt-decode)
//     const decoded = jwt_decode(token);
//     return decoded; // Trả về thông tin user (id, username, role, ...)
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };