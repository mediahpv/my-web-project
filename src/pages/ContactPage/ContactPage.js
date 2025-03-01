// src/pages/ContactPage/ContactPage.js
import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn submit form mặc định
    setSubmitting(true); // Đặt trạng thái đang gửi
    setError(null); // Xóa lỗi cũ (nếu có)

    // Gọi API để gửi dữ liệu form
    fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // Nếu server trả về lỗi (status code 4xx hoặc 5xx)
          throw new Error('Gửi yêu cầu liên hệ không thành công.');
        }
        return response.json(); // Chuyển response sang JSON
      })
      .then((data) => {
        // Xử lý khi gửi thành công
        setSubmitted(true); // Đặt trạng thái đã gửi
        setSubmitting(false); // Đặt trạng thái không còn gửi nữa
        // Reset form (tùy chọn)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        // Xử lý lỗi
        setError(error.message); // Lưu thông báo lỗi
        setSubmitting(false); // Đặt trạng thái không còn gửi nữa
      });
  };

  return (
    <div className="contact-page">
      <h1>Liên Hệ</h1>

      <div className="contact-info">
        <h2>Thông Tin Liên Hệ</h2>
        <p>
          <strong>Địa chỉ:</strong> 123 Đường ABC, Thành phố XYZ
        </p>
        <p>
          <strong>Điện thoại:</strong> (0123) 456-7890
        </p>
        <p>
          <strong>Email:</strong> contact@example.com
        </p>
        {/* Thêm liên kết mạng xã hội (nếu có) */}
      </div>

      <h2>Gửi Tin Nhắn Cho Chúng Tôi</h2>

      {submitted ? (
        <div className="success-message">
          <p>Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Họ và Tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Tiêu đề:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Nội dung:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5" // Thêm thuộc tính rows
            ></textarea>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </form>
      )}

      {/* (Tùy chọn) Thêm bản đồ */}
    </div>
  );
}

export default ContactPage;