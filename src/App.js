// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import AppRoutes from './routes'; // Import AppRoutes
import Layout from './components/Layout/Layout'; // Import Layout
import './App.css'; // Import CSS (nếu bạn có file App.css riêng)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;