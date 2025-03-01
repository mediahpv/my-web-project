// backend/services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Lấy danh sách tất cả người dùng (dành cho admin)
exports.getAllUsers = async () => {
    try {
        const users = await User.find().select('-password'); // Không trả về trường password
        return users;
    } catch (error) {
        throw new Error('Error getting all users: ' + error.message);
    }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found'); // Throw error để controller xử lý
        }
        return user;
    } catch (error) {
        throw new Error('Error getting user by ID: ' + error.message);
    }
};
// Lấy thông tin user bằng username
exports.getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username: username })
        return user
    } catch (error) {
        throw new Error('Error getting user by ID: ' + error.message);
    }
}

// Cập nhật thông tin người dùng (chỉ cho phép user tự cập nhật thông tin của mình, hoặc admin)
exports.updateUser = async (userId, updateData, requestingUser) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Kiểm tra quyền (authorization)
        if (requestingUser.role !== 'admin' && requestingUser.id.toString() !== userId.toString()) {
            throw new Error('Unauthorized'); // Không có quyền
        }

        // Cập nhật thông tin (trừ password)
        for (const key in updateData) {
            if (key !== 'password' && updateData.hasOwnProperty(key)) {
                user[key] = updateData[key];
            }
        }

        await user.save();
        return user.toObject({ versionKey: false })
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Thay đổi mật khẩu
exports.changePassword = async (userId, oldPassword, newPassword, requestingUser) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Kiểm tra quyền
        if (requestingUser.role !== 'admin' && requestingUser.id.toString() !== userId.toString()) {
            throw new Error('Unauthorized');
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            throw new Error('Incorrect old password');
        }

        // Hash mật khẩu mới và lưu
        user.password = newPassword; // Mongoose pre-save hook sẽ tự động hash
        await user.save();
        return { message: "Change password success" }

    } catch (error) {
        throw new Error('Error changing password: ' + error.message);
    }
};

// Xóa người dùng (chỉ dành cho admin)
exports.deleteUser = async (userId, requestingUser) => {
    try {
        // Kiểm tra quyền (authorization)
        if (requestingUser.role !== 'admin') {
            throw new Error('Unauthorized');
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' }

    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

// (Tùy chọn) Lấy thông tin người dùng hiện tại (dựa trên token)
exports.getCurrentUser = async (requestingUser) => {
    // requestingUser đã được middleware xác thực (authentication) đưa vào,
    // nên bạn có thể tin tưởng thông tin trong đó.

    return requestingUser;
};