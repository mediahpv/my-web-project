// admin/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import useFetch from '../../frontend/src/hooks/useFetch'; // Import useFetch (CHÚ Ý ĐƯỜNG DẪN)
import './UserManagement.css'; // Import CSS

function UserManagement() {
    // Giả sử có API endpoint: /api/users
    const { data: users, loading, error } = useFetch('http://localhost:3001/api/users'); // Thay đổi URL nếu cần
    //const [users, setUsers] = useState([])
    if (loading) {
        return <div className="loading">Đang tải danh sách người dùng...</div>;
    }

    if (error) {
        return <div className="error">Lỗi: {error.message}</div>;
    }

    return (
        <div className="user-management">
            <h1>Quản lý người dùng</h1>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Hành động</th> {/* Thêm, sửa, xóa */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {/* Các nút Thêm, Sửa, Xóa (sẽ làm sau) */}
                                <button>Sửa</button>
                                <button>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;