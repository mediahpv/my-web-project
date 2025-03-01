// frontend/src/routes/index.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage/ContactPage';
import NewsPage from '../pages/NewsPage/NewsPage'; // Thêm import
import NewsDetail from '../pages/NewsDetail/NewsDetail'; // Thêm import
import NotFoundPage from '../components/NotFoundPage';
// import AdminDashboard from '../pages/Admin/Dashboard'; // Ví dụ (thêm sau)
// ... import các component trang khác ...

const AppRoutes = () => {
    return (
        
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                {/* Thêm các route khác (nếu cần) */}
                {/* Ví dụ:
                <Route path="/admin" element={<AdminDashboard />} />
                */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        
    );
};

export default AppRoutes;