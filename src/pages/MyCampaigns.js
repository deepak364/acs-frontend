// src/pages/MyCampaigns.js
// Shows all campaigns created by the logged-in user
// with their approval status — pending, approved, or rejected.

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import './MyCampaigns.css';

const STATUS_CONFIG = {
  approved: { label: 'Approved', badge: 'badge-approved', icon: '✅', desc: 'Live on homepage' },
  pending: { label: 'Pending', badge: 'badge-pending', icon: '⏳', desc: 'Waiting for review' },
  rejected: { label: 'Rejected', badge: 'badge-rejected', icon: '❌', desc: 'Not approved' },
};

const CATEGORY_COLORS = {
  Environment: '#14b8a6',
  Health: '#ef4444',
  Education: '#2563eb',
  'Human Rights': '#8b5cf6',
  'Animal Welfare': '#22c55e',
  Community: '#f59e0b',
  Other: '#ec4899',
};

export default function MyCampaigns() {
  
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    API.get('/campaigns/my')
      .then(res => setCampaigns(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? campaigns
    : campaigns.filter(c => c.status === filter);

  const counts = {
    all: campaigns.length,
    approved: campaigns.filter(c => c.status === 'approved').length,
    pending: campaigns.filter(c => c.status === 'pending').length,
    rejected: campaigns.filter(c => c.status === 'rejected').length,
  };

  return (
    <div className="my-campaigns page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="my-campaigns__header">
          <div>
            <h1 className="section-title">My Campaigns</h1>
            <p className="section-subtitle">
              You have created {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link to="/campaigns/new" className="btn btn-primary">
            + New Campaign
          </Link>
        </div>

        {/* Stats row */}
        {campaigns.length > 0 && (
          <div className="my-campaigns__stats">
            {[
              { key: 'all', label: 'Total', color: '#1e293b' },
              { key: 'approved', label: 'Live', color: '#16a34a' },
              { key: 'pending', label: 'Pending', color: '#d97706' },
              { key: 'rejected', label: 'Rejected', color: '#dc2626' },
            ].map(s => (
              <button
                key={s.key}
                className={`stat-pill ${filter === s.key ? 'active' : ''}`}
                onClick={() => setFilter(s.key)}
                style={{ '--pill-color': s.color }}
              >
                <span className="stat-pill__num">{counts[s.key]}</span>
                <span className="stat-pill__label">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="my-campaigns__grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="mc-card">
                <div className="skeleton" style={{ height: 5 }} />
                <div className="mc-card__body">
                  <div className="skeleton" style={{ height: 18, width: '60%', marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 14, marginBottom: 6 }} />
                  <div className="skeleton" style={{ height: 14, width: '80%', marginBottom: 20 }} />
                  <div className="skeleton" style={{ height: 32, borderRadius: 8 }} />
                </div>
              </div>
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          /* No campaigns at all */
          <div className="my-campaigns__empty">
            <div className="empty-illustration">📢</div>
            <h2>You haven't created any campaigns yet</h2>
            <p>Start a campaign to raise awareness for a cause you care about. Once submitted, our team reviews it and publishes it to the community.</p>
            <Link to="/campaigns/new" className="btn btn-primary btn-lg" style={{ marginTop: 20 }}>
              Create Your First Campaign
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          /* No campaigns matching the filter */
          <div className="my-campaigns__empty">
            <div className="empty-illustration">🔍</div>
            <h2>No {filter} campaigns</h2>
            <p>You don't have any {filter} campaigns yet.</p>
            <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={() => setFilter('all')}>
              Show all campaigns
            </button>
          </div>
        ) : (
          <div className="my-campaigns__grid">
            {filtered.map(c => <MyCampaignCard key={c.id} campaign={c} />)}
          </div>
        )}

      </div>
    </div>
  );
}

function MyCampaignCard({ campaign: c }) {
  const status = STATUS_CONFIG[c.status] || STATUS_CONFIG.pending;
  const color = CATEGORY_COLORS[c.category] || '#2563eb';
  const date = new Date(c.created_at).toLocaleDateString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className={`mc-card mc-card--${c.status}`}>
      {/* Coloured top strip */}
      <div className="mc-card__strip" style={{ background: color }} />

      <div className="mc-card__body">
        {/* Status + category row */}
        <div className="mc-card__top">
          <span className={`mc-badge ${status.badge}`}>
            {status.icon} {status.label}
          </span>
          <span className="mc-card__category">{c.category}</span>
        </div>

        {/* Title */}
        <h3 className="mc-card__title">{c.title}</h3>

        {/* Description */}
        <p className="mc-card__desc">
          {c.description.length > 120
            ? c.description.slice(0, 120) + '…'
            : c.description}
        </p>

        {/* Status explanation */}
        <div className={`mc-card__status-bar mc-card__status-bar--${c.status}`}>
          <span className="mc-card__status-text">{status.desc}</span>
          {c.status === 'approved' && (
            <span className="mc-card__participants">
              🙋 {c.participant_count || 0} joined
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mc-card__footer">
          <span className="mc-card__date">Created {date}</span>
          {c.status === 'rejected' && (
            <Link to="/campaigns/new" className="btn btn-sm btn-primary">
              Create New
            </Link>
          )}
          {c.status === 'approved' && (
            <Link to="/" className="btn btn-sm btn-secondary">
              View Live →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
