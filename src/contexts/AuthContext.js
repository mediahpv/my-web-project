// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getToken, removeToken, saveToken } from '../services/auth'; // Import các hàm từ authService

// 1. Tạo Context
const AuthContext = createContext(null);

// 2. Tạo Provider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
  useEffect(() => {
    const token = getToken();
    if (token) {
      // TODO: Gọi API để lấy thông tin user (nếu cần)
      // Tạm thời: Giả lập đã đăng nhập
      setIsAuthenticated(true);
      setUser({ username: 'testuser', role: 'user' }); // Thay bằng thông tin user thực tế
    }
    setLoading(false); // Kết thúc loading
  }, []);

  const login = (token, userData) => {
    saveToken(token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  const authContextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  if (loading) {
    return <div>Loading...</div>; // Hoặc hiển thị một loading spinner
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Tạo custom hook để sử dụng Context (tùy chọn, nhưng rất tiện)
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth }; // Export cả Provider và hook