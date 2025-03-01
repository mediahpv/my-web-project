// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null); // Dữ liệu trả về từ API (ban đầu là null)
  const [loading, setLoading] = useState(true); // Trạng thái loading (ban đầu là true)
  const [error, setError] = useState(null); // Trạng thái lỗi (ban đầu là null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reset lại trạng thái mỗi khi URL thay đổi
        setLoading(true);
        setError(null);
        setData(null); // (Tùy chọn) Xóa dữ liệu cũ

        const response = await fetch(url); // Gọi API

        // Kiểm tra lỗi (ví dụ: 404 Not Found, 500 Internal Server Error)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json(); // Chuyển response sang JSON
        setData(jsonData); // Lưu dữ liệu vào state
      } catch (error) {
        setError(error); // Lưu lỗi vào state
      } finally {
        setLoading(false); // Đặt loading thành false (dù thành công hay thất bại)
      }
    };

    fetchData();

    // Cleanup function (optional): Hủy request nếu component bị unmount
    return () => {
      // (Bạn có thể sử dụng AbortController để cancel fetch request
      //  nếu component bị unmount trước khi request hoàn thành.
      //  Phần này hơi nâng cao, bạn có thể tìm hiểu thêm.)
    };
  }, [url]); // Dependency array: useEffect sẽ chạy lại khi URL thay đổi

  return { data, loading, error }; // Trả về dữ liệu, trạng thái loading, và lỗi
}

export default useFetch;