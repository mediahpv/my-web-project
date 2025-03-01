// frontend/src/utils/date.js

export const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }
  };
  
  export const formatDateTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
    } catch (error) {
      console.error("Invalid date string:", dateString);
      return "Invalid Date";
    }
  };
  
  //Tính thời gian
  export const timeSince = (date) => {
    if (typeof date !== 'object') {
        date = new Date(date);
      }
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
  
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'năm trước';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'tháng trước';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'ngày trước';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "giờ trước";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "phút trước";
                    } else {
                        interval = seconds;
                        intervalType = "giây trước";
                    }
                }
            }
        }
    }
    if(interval > 1 || interval === 0) {
        intervalType = 'giây trước'
    }
    return interval + ' ' + intervalType;
  };
  // Các hàm khác liên quan đến ngày tháng ...