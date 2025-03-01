// src/App.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

// Test case kiểm tra các đường dẫn khi đã đăng nhập
describe('App Routing with Authentication', () => {
    it('should render HomePage for / path when authenticated', () => {
        render(
            <Router>
                    <App />
            </Router>
        );
        expect(screen.getByText(/Chào mừng/i)).toBeInTheDocument(); // Thay đổi nội dung phù hợp
    });
});

// Test case kiểm tra các đường dẫn khi chưa đăng nhập
describe('App Routing without Authentication', () => {
    it('should redirect to login page for protected routes', () => {
        // Cần thiết lập localStorage để giả lập trạng thái chưa đăng nhập
        localStorage.removeItem('token'); // Xóa token (nếu có)

    });
});