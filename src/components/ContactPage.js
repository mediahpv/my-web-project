// src/components/ContactPage.js
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
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Gọi API để gửi dữ liệu
    fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSubmitted(true); // Đặt trạng thái đã gửi thành công
        setSubmitting(false);
        // Reset form (tùy chọn)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      })
      .catch((error) => {
        setError(error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="contact-page">
      <h1>Liên hệ</h1>

      <div className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <p>
          <strong>Địa chỉ:</strong> 123 Đường ABC, Thành phố XYZ<br />
          <strong>Điện thoại:</strong> (0123) 456-7890<br />
          <strong>Email:</strong> contact@example.com
        </p>
      </div>

      <h2>Gửi tin nhắn cho chúng tôi</h2>
      {submitted ? ( // Hiển thị thông báo khi đã gửi thành công
        <div className="success-message">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          {error && <div className="error-message">{error}</div>}
          <div>
            <label htmlFor="name">Họ và tên:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
          <div>
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
          <div>
            <label htmlFor="message">Nội dung:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Đang gửi...' : 'Gửi'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactPage;