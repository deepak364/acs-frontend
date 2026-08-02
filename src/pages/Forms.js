import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import './Forms.css';

const CAMPAIGN_CATEGORIES = ['Environment', 'Health', 'Education', 'Human Rights', 'Animal Welfare', 'Community', 'Other'];
const BUSINESS_CATEGORIES = ['Food & Beverage', 'Retail', 'Health & Wellness', 'Technology', 'Education', 'Services', 'Other'];

// ── CREATE CAMPAIGN ──────────────────────────────────────────
export function CreateCampaign() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await API.post('/campaigns', form);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit campaign.');
    } finally { setLoading(false); }
  };

  return (
    <div className="form-page page-wrapper">
      <div className="container-sm">
        <div className="form-page__header">
          <Link to="/" className="form-back">← Back to campaigns</Link>
          <h1 className="section-title" style={{ marginTop: 12 }}>Create a Campaign</h1>
          <p className="section-subtitle">Share your cause and rally your community</p>
        </div>

        <div className="form-layout">
          {/* Main form */}
          <div className="form-card">
            {success && (
              <div className="alert alert-success" style={{ marginBottom: 24 }}>
                🎉 Campaign submitted! It's under review and will go live once approved.
                Redirecting you home…
              </div>
            )}
            {error && (
              <div className="alert alert-error" style={{ marginBottom: 24 }}>⚠️ {error}</div>
            )}

            <form onSubmit={onSubmit} className="form-fields">
              <div className="form-group">
                <label className="form-label">Campaign Title <span className="form-required">*</span></label>
                <input
                  name="title"
                  className="form-input"
                  placeholder="Give your campaign a clear, compelling title"
                  value={form.title}
                  onChange={onChange}
                  required
                  maxLength={200}
                />
                <span className="form-hint">{200 - form.title.length} characters remaining</span>
              </div>

              <div className="form-group">
                <label className="form-label">Category <span className="form-required">*</span></label>
                <select name="category" className="form-select" value={form.category} onChange={onChange} required>
                  <option value="">Select a category</option>
                  {CAMPAIGN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description <span className="form-required">*</span></label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Tell your story — what is this campaign about, why does it matter, and how can people help?"
                  value={form.description}
                  onChange={onChange}
                  required
                  rows={7}
                  style={{ minHeight: 160 }}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg form-submit" disabled={loading || success}>
                {loading ? <><span className="spinner" /> Submitting…</> : '🚀 Submit Campaign'}
              </button>
            </form>
          </div>

          {/* Tips sidebar */}
          <div className="form-tips">
            <h3 className="form-tips__title">📝 Tips for a great campaign</h3>
            <ul className="form-tips__list">
              <li><strong>Be specific</strong> — a clear title gets more attention</li>
              <li><strong>Tell your story</strong> — explain why this cause matters to you</li>
              <li><strong>Call to action</strong> — tell people what they can do to help</li>
              <li><strong>Stay factual</strong> — campaigns with verified info gain more trust</li>
            </ul>
            <div className="form-tips__note">
              💡 Your campaign will be reviewed by an admin before going live — usually within 24 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CREATE BUSINESS ──────────────────────────────────────────
export function CreateBusiness() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ biz_name: '', description: '', category: '', contact: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await API.post('/businesses', form);
      setSuccess(true);
      setTimeout(() => navigate('/businesses'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing.');
    } finally { setLoading(false); }
  };

  return (
    <div className="form-page page-wrapper">
      <div className="container-sm">
        <div className="form-page__header">
          <Link to="/businesses" className="form-back">← Back to businesses</Link>
          <h1 className="section-title" style={{ marginTop: 12 }}>List Your Business</h1>
          <p className="section-subtitle">Reach thousands of community members</p>
        </div>

        <div className="form-layout">
          <div className="form-card">
            {success && (
              <div className="alert alert-success" style={{ marginBottom: 24 }}>
                🎉 Your business is now listed! Redirecting…
              </div>
            )}
            {error && (
              <div className="alert alert-error" style={{ marginBottom: 24 }}>⚠️ {error}</div>
            )}

            <form onSubmit={onSubmit} className="form-fields">
              <div className="form-group">
                <label className="form-label">Business Name <span className="form-required">*</span></label>
                <input
                  name="biz_name"
                  className="form-input"
                  placeholder="e.g. Smith's Bakery"
                  value={form.biz_name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category <span className="form-required">*</span></label>
                <select name="category" className="form-select" value={form.category} onChange={onChange} required>
                  <option value="">Select a category</option>
                  {BUSINESS_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">About Your Business <span className="form-required">*</span></label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Tell the community what makes your business special…"
                  value={form.description}
                  onChange={onChange}
                  required
                  rows={5}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Information <span className="form-required">*</span></label>
                <input
                  name="contact"
                  className="form-input"
                  placeholder="Phone, email, or website URL"
                  value={form.contact}
                  onChange={onChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg form-submit" disabled={loading || success}>
                {loading ? <><span className="spinner" /> Listing…</> : '🏪 List My Business'}
              </button>
            </form>
          </div>

          <div className="form-tips">
            <h3 className="form-tips__title">🏪 Get more visibility</h3>
            <ul className="form-tips__list">
              <li><strong>Clear name</strong> — use your official business name</li>
              <li><strong>Good description</strong> — mention your products and what makes you unique</li>
              <li><strong>Contact details</strong> — make it easy for customers to reach you</li>
              <li><strong>Right category</strong> — helps people find you faster</li>
            </ul>
            <div className="form-tips__note">
              💡 Your listing goes live immediately and is visible to all community members.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
