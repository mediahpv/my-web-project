// src/pages/AboutPage/AboutPage.js
import React from 'react';
import './AboutPage.css'; // Import CSS

function AboutPage() {
  return (
    <div className="about-page">
      <h1>Về Chúng Tôi</h1>

      <section className="introduction">
        <h2>Giới thiệu chung</h2>
        <p>
          Chào mừng đến với [Tên công ty của bạn]! Chúng tôi là một [loại hình công ty]
          chuyên cung cấp [sản phẩm/dịch vụ] chất lượng cao. Với kinh nghiệm [số năm]
          trong ngành, chúng tôi cam kết mang đến cho khách hàng những trải nghiệm
          tốt nhất.
        </p>
      </section>

      <section className="history">
        <h2>Lịch sử phát triển</h2>
        <ul>
          <li>
            <strong>2010:</strong> Thành lập công ty.
          </li>
          <li>
            <strong>2015:</strong> Mở rộng thị trường sang [khu vực].
          </li>
          <li>
            <strong>2020:</strong> Ra mắt dòng sản phẩm/dịch vụ mới.
          </li>
          {/* ... Thêm các mốc thời gian khác ... */}
        </ul>
      </section>

      <section className="mission-vision">
        <h2>Tầm nhìn & Sứ mệnh</h2>
        <div className="mission">
          <h3>Sứ mệnh</h3>
          <p>[Mô tả sứ mệnh của công ty bạn.]</p>
        </div>
        <div className="vision">
          <h3>Tầm nhìn</h3>
          <p>[Mô tả tầm nhìn của công ty bạn.]</p>
        </div>
      </section>

      <section className="team">
        <h2>Đội ngũ</h2>
        <div className="team-members">
          {/* Ví dụ thành viên (lặp lại) */}
          <div className="team-member">
            <img src="/images/team-member-1.jpg" alt="Tên thành viên 1" className="team-member-image" />
            <h3>Tên thành viên 1</h3>
            <p className="team-member-title">Chức danh</p>
            <p className="team-member-bio">Mô tả ngắn gọn về thành viên.</p>
          </div>
          <div className="team-member">
            <img src="/images/team-member-2.jpg" alt="Tên thành viên 2" className="team-member-image" />
            <h3>Tên thành viên 2</h3>
            <p className="team-member-title">Chức danh</p>
            <p className="team-member-bio">Mô tả ngắn gọn về thành viên.</p>
          </div>
          {/* ... Thêm các thành viên khác ... */}
        </div>
      </section>

      {/* (Tùy chọn) Thêm các phần khác: Thành tựu, CTA, ... */}
    </div>
  );
}

export default AboutPage;