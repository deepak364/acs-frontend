import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

// ── LOGIN ────────────────────────────────────────────────────
export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* Left panel */}
      <div className="auth-panel auth-panel--left">
        <div className="auth-panel__content">
          <Link to="/" className="auth-brand">
            <div className="auth-brand__logo">A</div>
            <span>ACS Awareness</span>
          </Link>
          <div className="auth-panel__hero">
            <h2>Welcome back to the community</h2>
            <p>Sign in to manage your campaigns and make a difference.</p>
            <div className="auth-panel__features">
              {['Create social campaigns', 'Connect with your community', 'Track your impact', 'Support local businesses'].map(f => (
                <div key={f} className="auth-panel__feature">
                  <span className="auth-panel__feature-icon">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="auth-panel auth-panel--right">
        <div className="auth-form-wrap">
          <div className="auth-form__header">
            <h1 className="auth-form__title">Sign in</h1>
            <p className="auth-form__subtitle">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Create one free</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={onChange}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In →'}
            </button>
          </form>

          {/* Demo credentials */}
          {/* <div className="auth-demo">
            <div className="auth-demo__label">Quick demo access</div>
            <div className="auth-demo__items">
              <button className="auth-demo__item" onClick={() => setForm({ email: 'admin@acs.com', password: 'password' })}>
                🛡️ Admin account
              </button>
              <button className="auth-demo__item" onClick={() => setForm({ email: 'user@acs.com', password: 'password' })}>
                👤 User account
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// ── REGISTER ─────────────────────────────────────────────────
export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'user', label: 'Regular User', icon: '👤', desc: 'Create and join campaigns' },
    { value: 'business_owner', label: 'Business Owner', icon: '🏪', desc: 'Promote your business' },
  ];

  return (
    <div className="auth-layout">
      {/* Left panel */}
      <div className="auth-panel auth-panel--left">
        <div className="auth-panel__content">
          <Link to="/" className="auth-brand">
            <div className="auth-brand__logo">A</div>
            <span>ACS Awareness</span>
          </Link>
          <div className="auth-panel__hero">
            <h2>Join thousands making a difference</h2>
            <p>Create your free account and start contributing to social causes today.</p>
            <div className="auth-panel__features">
              {['Free to join, always', 'Create unlimited campaigns', 'Connect with like-minded people', 'Support small businesses'].map(f => (
                <div key={f} className="auth-panel__feature">
                  <span className="auth-panel__feature-icon">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-panel auth-panel--right">
        <div className="auth-form-wrap">
          <div className="auth-form__header">
            <h1 className="auth-form__title">Create account</h1>
            <p className="auth-form__subtitle">
              Already have one?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input
                name="name"
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                name="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={onChange}
                required
                minLength={6}
              />
            </div>

            {/* Role selector */}
            <div className="form-group">
              <label className="form-label">Account type</label>
              <div className="role-selector">
                {roles.map(r => (
                  <label
                    key={r.value}
                    className={`role-option ${form.role === r.value ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={form.role === r.value}
                      onChange={onChange}
                      style={{ display: 'none' }}
                    />
                    <span className="role-option__icon">{r.icon}</span>
                    <div>
                      <div className="role-option__label">{r.label}</div>
                      <div className="role-option__desc">{r.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Creating account…</> : 'Create Account →'}
            </button>

            <p className="auth-terms">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
