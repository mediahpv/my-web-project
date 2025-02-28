// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset trạng thái mỗi khi URL thay đổi
    setLoading(true);
    setError(null);
    setData(null); // Xóa dữ liệu cũ (tùy chọn)

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (optional) - Hủy request nếu component unmount
    return () => {
      // Bạn có thể sử dụng AbortController để cancel fetch request
      // nếu component bị unmount trước khi request hoàn thành.
      // (Phần này nâng cao hơn một chút)
    };
  }, [url]); // Dependency array: useEffect sẽ chạy lại khi URL thay đổi.

  return { data, loading, error };
}

export default useFetch;