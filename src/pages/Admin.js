import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import './Admin.css';

export default function AdminDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    Promise.all([
      API.get('/campaigns/pending'),
      API.get('/campaigns'),
    ]).then(([pending, all]) => {
      setCampaigns(pending.data);
      const all_camps = all.data;
      setStats({
        total: all_camps.length,
        approved: all_camps.filter(c => c.status === 'approved').length,
        pending: pending.data.length,
        rejected: all_camps.filter(c => c.status === 'rejected').length,
      });
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = async (id, action) => {
    try {
      await API.patch(`/campaigns/${id}/${action}`);
      setCampaigns(prev => prev.filter(c => c.id !== id));
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        approved: action === 'approve' ? prev.approved + 1 : prev.approved,
        rejected: action === 'reject' ? prev.rejected + 1 : prev.rejected,
      }));
      showToast(`Campaign ${action}d successfully.`);
    } catch {
      showToast('Action failed. Please try again.', 'error');
    }
  };

  const STATS = [
    { label: 'Total Campaigns', value: stats.total, icon: '📊', color: 'var(--blue-50)', text: 'var(--blue-600)' },
    { label: 'Approved', value: stats.approved, icon: '✅', color: 'var(--green-100)', text: 'var(--green-600)' },
    { label: 'Pending Review', value: stats.pending, icon: '⏳', color: 'var(--amber-100)', text: 'var(--amber-600)' },
    { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'var(--red-100)', text: 'var(--red-600)' },
  ];

  return (
    <div className="admin page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="admin__header">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="section-subtitle">Review and manage all campaign submissions</p>
          </div>
          <div className="admin__header-badge">
            🛡️ Administrator Access
          </div>
        </div>

        {/* Stats */}
        <div className="admin__stats">
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__icon" style={{ background: s.color, color: s.text }}>
                {s.icon}
              </div>
              <div className="stat-card__value" style={{ color: s.text }}>{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending campaigns */}
        <div className="admin__section">
          <h2 className="admin__section-title">
            Pending Reviews
            {campaigns.length > 0 && (
              <span className="admin__count">{campaigns.length}</span>
            )}
          </h2>

          {loading ? (
            <div className="admin__loading">
              {[1, 2, 3].map(i => (
                <div key={i} className="admin-card">
                  <div className="skeleton" style={{ height: 20, width: '40%', marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 16, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 16, width: '70%' }} />
                </div>
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h3>All caught up!</h3>
              <p>No campaigns are waiting for review right now.</p>
            </div>
          ) : (
            <div className="admin__cards">
              {campaigns.map(c => (
                <div key={c.id} className="admin-card">
                  <div className="admin-card__top">
                    <div className="admin-card__meta">
                      <span className="badge badge-amber">{c.category}</span>
                      <span className="admin-card__date">
                        {new Date(c.created_at).toLocaleDateString('en-AU', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </div>
                    <span className="badge badge-amber admin-card__status">⏳ Pending</span>
                  </div>
                  <h3 className="admin-card__title">{c.title}</h3>
                  <p className="admin-card__desc">{c.description}</p>
                  <div className="admin-card__author">
                    <div className="admin-card__author-avatar">
                      {c.author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="admin-card__author-name">{c.author}</div>
                      <div className="admin-card__author-email">{c.author_email}</div>
                    </div>
                  </div>
                  <div className="admin-card__actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleAction(c.id, 'approve')}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleAction(c.id, 'reject')}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`}>
          {toast.type === 'success' ? '✅' : '⚠️'} {toast.msg}
        </div>
      )}
    </div>
  );
}
