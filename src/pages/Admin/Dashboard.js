// frontend/src/components/UI/Input.js
import React from 'react';
import './Input.css';

function Input({ label, type, id, name, value, onChange, placeholder, error, ...rest }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input ${error ? 'error' : ''}`}
        {...rest}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Input;