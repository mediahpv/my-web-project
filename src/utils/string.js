// frontend/src/utils/string.js

export const truncate = (str, maxLength) => {
    if (!str) return ''; // Hoặc null, tùy bạn
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + '...';
  };
  
  export const capitalize = (str) => {
      if(!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Các hàm khác liên quan đến chuỗi ...