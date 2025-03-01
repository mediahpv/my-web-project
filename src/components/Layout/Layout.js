// frontend/src/components/Layout/Layout.js
import React from 'react';
import Header from '../Header/Header'; // Import Header
import Footer from '../Footer/Footer'; // Import Footer
import './Layout.css'; // Import CSS (nếu cần)

function Layout({ children }) {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;