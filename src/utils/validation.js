// frontend/src/utils/validation.js

export const isValidEmail = (email) => {
    // (Sử dụng regular expression để kiểm tra email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const isStrongPassword = (password) => {
      // Kiểm tra độ dài
      if (password.length < 8) {
        return false;
      }
      // Kiểm tra chữ hoa
      if (!/[A-Z]/.test(password)) {
        return false;
      }
      // Kiểm tra chữ thường
      if (!/[a-z]/.test(password)) {
        return false;
      }
      // Kiểm tra số
      if (!/[0-9]/.test(password)) {
        return false;
      }
      // Kiểm tra ký tự đặc biệt
      if (!/[^A-Za-z0-9]/.test(password)) {
        return false;
      }
  
      return true;
  }
  
  // Các hàm khác liên quan đến validation ...