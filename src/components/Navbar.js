import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path) => location.pathname === path;

  const roleLabel = {
    admin: '🛡️ Admin',
    business_owner: '🏪 Business',
    user: '👤 User',
  }[user?.role] || '';

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* Brand */}
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo">
            <span>A</span>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">ACS Awareness</span>
            <span className="navbar__brand-tagline">Social Platform</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="navbar__links">
          <Link to="/about" className={`navbar__link ${isActive('/about') ? 'active' : ''}`}>About</Link>

          <Link to="/" className={`navbar__link ${isActive('/') ? 'active' : ''}`}>Campaigns</Link>
          <Link to="/businesses" className={`navbar__link ${isActive('/businesses') ? 'active' : ''}`}>Businesses</Link>

          <Link to="/my-campaigns" className="navbar__dropdown-item">
            📋 My Campaigns
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`navbar__link navbar__link--admin ${isActive('/admin') ? 'active' : ''}`}>
              Admin Panel
            </Link>
          )}
        </div>

        {/* Desktop auth */}
        <div className="navbar__auth">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          ) : (
            <div className="navbar__user">
              {user.role === 'business_owner' && (
                <Link to="/business/new" className="btn btn-secondary btn-sm">+ Add Business</Link>
              )}
              <Link to="/campaigns/new" className="btn btn-primary btn-sm">+ Campaign</Link>
              <div className="navbar__avatar-wrap">
                <button
                  className="navbar__avatar"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="navbar__avatar-img">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </button>
                {dropdownOpen && (
                  <div className="navbar__dropdown">
                    <div className="navbar__dropdown-header">
                      <div className="navbar__dropdown-name">{user.name}</div>
                      <div className="navbar__dropdown-role">{roleLabel}</div>
                      <div className="navbar__dropdown-email">{user.email}</div>
                    </div>
                    <div className="navbar__dropdown-divider" />
                    <Link to="/my-campaigns" className="navbar__dropdown-item">
                      📋 My Campaigns
                    </Link>
                    <div className="navbar__dropdown-divider" />
                    <button onClick={handleLogout} className="navbar__dropdown-item navbar__dropdown-item--danger">
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          <Link to="/" className="navbar__mobile-link">🌍 Campaigns</Link>
          <Link to="/businesses" className="navbar__mobile-link">🏪 Businesses</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="navbar__mobile-link">🛡️ Admin Panel</Link>
          )}
          <div className="navbar__mobile-divider" />
          {!user ? (
            <>
              <Link to="/login" className="navbar__mobile-link">Log in</Link>
              <Link to="/register" className="btn btn-primary" style={{ margin: '8px 16px' }}>Get Started</Link>
            </>
          ) : (
            <>
              <div className="navbar__mobile-user">
                Signed in as <strong>{user.name}</strong> · {roleLabel}
              </div>
              <Link to="/campaigns/new" className="navbar__mobile-link">+ New Campaign</Link>
              {user.role === 'business_owner' && (
                <Link to="/business/new" className="navbar__mobile-link">+ Add Business</Link>
              )}
              <Link to="/my-campaigns" className="navbar__mobile-link">📋 My Campaigns</Link>
              <button onClick={handleLogout} className="navbar__mobile-link navbar__mobile-link--danger">
                🚪 Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
