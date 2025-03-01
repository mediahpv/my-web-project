// backend/utils/emailSender.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // 1. Tạo transporter (đối tượng để gửi email)
    const transporter = nodemailer.createTransport({
      // Cấu hình dịch vụ email bạn sử dụng (ví dụ: Gmail, SendGrid, ...)
      // Ở đây, tôi ví dụ với Gmail (bạn cần thay thế bằng thông tin của bạn)
      // LƯU Ý: Với Gmail, bạn cần phải bật "Less secure app access"
      // (hoặc tốt hơn là dùng "App Passwords") trong cài đặt tài khoản Gmail.
      // Xem hướng dẫn của Gmail để biết thêm chi tiết.
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL, // Địa chỉ email của bạn
        pass: process.env.SMPT_PASSWORD, // Mật khẩu email của bạn (hoặc App Password)
      },
    });

    // 2. Tạo nội dung email
    const mailOptions = {
      from: process.env.SMPT_MAIL, // Địa chỉ email người gửi
      to: options.email, // Địa chỉ email người nhận
      subject: options.subject, // Tiêu đề email
      text: options.message, // Nội dung email (dạng text)
      html: options.html, // Nội dung email (dạng HTML) - tùy chọn
    };

    // 3. Gửi email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', options.email);
  } catch (error) {
    console.error('Error sending email:', error);
    // Trong thực tế, bạn có thể muốn xử lý lỗi kỹ hơn (ví dụ: ghi log, thử lại, ...)
    throw error; // Hoặc return false;  (tùy bạn)
  }
};

module.exports = sendEmail;