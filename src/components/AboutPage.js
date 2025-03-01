// src/components/AboutPage.js
import React from 'react';
import './AboutPage.css'; // Import file CSS

function AboutPage() {
  return (
    <div className="about-page">
      <h1>Về Chúng Tôi</h1>

      <section className="introduction">
        <h2>Giới thiệu chung</h2>
        <p>
          [Viết một đoạn giới thiệu ngắn gọn về doanh nghiệp của bạn ở đây.
          Nói về mục đích thành lập, lĩnh vực hoạt động, và những điểm khác biệt
          của doanh nghiệp.]
        </p>
      </section>

      <section className="history">
        <h2>Lịch sử phát triển</h2>
        <ul>
          <li>
            <strong>2010:</strong> [Mô tả sự kiện/thành tựu quan trọng]
          </li>
          <li>
            <strong>2015:</strong> [Mô tả sự kiện/thành tựu quan trọng]
          </li>
          {/* ... Thêm các mốc thời gian khác ... */}
        </ul>
      </section>

      <section className="mission-vision">
        <h2>Tầm nhìn & Sứ mệnh</h2>
        <div>
          <h3>Tầm nhìn</h3>
          <p>[Mô tả tầm nhìn của doanh nghiệp (mong muốn trở thành gì trong tương lai).]</p>
        </div>
        <div>
          <h3>Sứ mệnh</h3>
          <p>[Mô tả sứ mệnh của doanh nghiệp (lý do tồn tại, mục đích phục vụ).]</p>
        </div>
        <div>
          <h3>Giá trị cốt lõi</h3>
          <ul>
              <li>[Giá trị 1]</li>
              <li>[Giá trị 2]</li>
              {/* ... */}
          </ul>
        </div>
      </section>

      <section className="team">
        <h2>Đội ngũ</h2>
        <div className="team-members">
          {/* Ví dụ thành viên (lặp lại) */}
          <div className="team-member">
            <img src="team-member-1.jpg" alt="Tên thành viên" />
            <h3>Tên thành viên 1</h3>
            <p>Chức danh</p>
            <p>Mô tả ngắn gọn</p>
          </div>
           <div className="team-member">
            <img src="team-member-1.jpg" alt="Tên thành viên" />
            <h3>Tên thành viên 2</h3>
            <p>Chức danh</p>
            <p>Mô tả ngắn gọn</p>
          </div>
          {/* ... Thêm các thành viên khác ... */}
        </div>
      </section>

      {/* Thêm các phần khác nếu cần (Thành tựu, CTA, ...) */}
    </div>
  );
}

export default AboutPage;