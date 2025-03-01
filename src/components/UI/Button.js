// frontend/src/components/UI/Button.js
import React from 'react';
import './Button.css'; // Import CSS

function Button({ children, onClick, type, className, disabled, ...rest }) {
  return (
    <button
      className={`button ${className || ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      type={type} // type="button" (mặc định), "submit", "reset"
      disabled={disabled}
      {...rest} // Cho phép truyền các props khác (ví dụ: title, aria-*, data-*, ...)
    >
      {children} {/* Nội dung của button (ví dụ: chữ, icon, ...) */}
    </button>
  );
}

export default Button;