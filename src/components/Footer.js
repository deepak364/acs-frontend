import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand column */}
          <div className="footer__brand">
            <div className="footer__logo-wrap">
              <div className="footer__logo">A</div>
              <div>
                <div className="footer__brand-name">ACS Awareness</div>
                <div className="footer__brand-tag">Social Platform</div>
              </div>
            </div>
            <p className="footer__brand-desc">
              A community platform built by Advanced Consulting Services to empower
              people to raise awareness for social causes and support local businesses.
            </p>
            <div className="footer__badges">
              <span className="footer__badge">🌍 Social Awareness</span>
              <span className="footer__badge">🏪 Local Business</span>
              <span className="footer__badge">🤝 Community</span>
            </div>
          </div>

          {/* Platform links */}
          <div className="footer__col">
            <div className="footer__col-title">Platform</div>
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/businesses" className="footer__link">Business Directory</Link>
            <Link to="/campaigns/new" className="footer__link">Create a Campaign</Link>
            <Link to="/about" className="footer__link">About ACS</Link>
          </div>

          {/* Account links */}
          <div className="footer__col">
            <div className="footer__col-title">Account</div>
            <Link to="/register" className="footer__link">Create Account</Link>
            <Link to="/login" className="footer__link">Sign In</Link>
            <Link to="/my-campaigns" className="footer__link">My Campaigns</Link>
          </div>

          {/* Categories */}
          <div className="footer__col">
            <div className="footer__col-title">Campaign Categories</div>
            {['Environment', 'Health', 'Education', 'Human Rights', 'Animal Welfare', 'Community'].map(cat => (
              <Link key={cat} to={`/?category=${cat}`} className="footer__link">{cat}</Link>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">
            © {year} Advanced Consulting Services (ACS). All rights reserved.
          </span>
          <span className="footer__built">
            Built with React · Node.js · PostgreSQL · Deployed on AWS
          </span>
        </div>
      </div>
    </footer>
  );
}
