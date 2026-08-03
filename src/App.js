import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import { Login, Register } from './pages/Auth';
import { CreateCampaign, CreateBusiness } from './pages/Forms';
import AdminDashboard from './pages/Admin';
import Businesses from './pages/Businesses';
import MyCampaigns from './pages/MyCampaigns';
import './styles/global.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
function AdminRoute({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;

  
}

function AppLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/campaigns/new" element={<PrivateRoute><CreateCampaign /></PrivateRoute>} />
          <Route path="/business/new" element={<PrivateRoute><CreateBusiness /></PrivateRoute>} />
          <Route path="/my-campaigns" element={<PrivateRoute><MyCampaigns /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
