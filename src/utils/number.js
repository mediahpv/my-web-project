// frontend/src/utils/number.js
export const formatCurrency = (number) => {
    if (isNaN(number)) {
        return "Invalid Number";
      }
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

// Các hàm khác liên quan đến số ...