import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const CATEGORY_COLORS = {
  Environment: 'badge-teal',
  Health: 'badge-red',
  Education: 'badge-blue',
  'Human Rights': 'badge-purple',
  'Animal Welfare': 'badge-green',
  Community: 'badge-amber',
  Other: 'badge-pink',
};

const STATS = [
  { value: '2.4K+', label: 'Active Members', icon: '👥', color: '#eff6ff' },
  { value: '180+', label: 'Campaigns Live', icon: '🌍', color: '#f0fdf4' },
  { value: '12+', label: 'Categories', icon: '🏷️', color: '#fdf4ff' },
  { value: '98%', label: 'Success Rate', icon: '⚡', color: '#fff7ed' },
];

export default function Home() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState({});
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Environment', 'Health', 'Education', 'Human Rights', 'Animal Welfare', 'Community', 'Other'];

  useEffect(() => {
    API.get('/campaigns')
      .then(res => setCampaigns(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleJoin = async (id) => {
    if (!user) return alert('Please log in to join campaigns.');
    try {
      await API.post(`/campaigns/${id}/join`);
      setJoined(prev => ({ ...prev, [id]: true }));
      setCampaigns(prev =>
        prev.map(c => c.id === id
          ? { ...c, participant_count: Number(c.participant_count) + 1 }
          : c
        )
      );
    } catch { alert('Could not join. Please try again.'); }
  };

  const filtered = campaigns.filter(c => {
    const matchCat = filter === 'All' || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="home">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>
        <div className="container hero__content">
          <div className="hero__badge">🌍 Social Awareness Platform</div>
          <h1 className="hero__title">
            Make a Real <span className="hero__title-accent">Impact</span><br />
            in Your Community
          </h1>
          <p className="hero__subtitle">
            Create campaigns, rally supporters, and drive change for the causes
            that matter most to you — all in one place.
          </p>
          <div className="hero__actions">
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary btn-lg hero__cta">
                  Start a Campaign →
                </Link>
                <Link to="/login" className="btn hero__cta-secondary">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/campaigns/new" className="btn btn-primary btn-lg hero__cta">
                + Create Campaign
              </Link>
            )}
          </div>
          {/* Stats row */}
          <div className="hero__stats">
            {STATS.map(s => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-icon" style={{ background: s.color }}>{s.icon}</div>
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPAIGNS ────────────────────────────────────── */}
      <section className="campaigns-section">
        <div className="container">
          {/* Header */}
          <div className="campaigns-header">
            <div>
              <h2 className="section-title">Active Campaigns</h2>
              <p className="section-subtitle">
                {filtered.length} campaign{filtered.length !== 1 ? 's' : ''} making a difference
              </p>
            </div>
            {user && (
              <Link to="/campaigns/new" className="btn btn-primary">
                + New Campaign
              </Link>
            )}
          </div>

          {/* Search + Filter */}
          <div className="campaigns-toolbar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search campaigns..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-tab ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="grid-3">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <h3>No campaigns found</h3>
              <p>Try a different search or category, or be the first to create one!</p>
              {user && (
                <Link to="/campaigns/new" className="btn btn-primary" style={{ marginTop: 16 }}>
                  Create Campaign
                </Link>
              )}
            </div>
          ) : (
            <div className="grid-3">
              {filtered.map(c => (
                <CampaignCard
                  key={c.id}
                  campaign={c}
                  joined={joined[c.id]}
                  onJoin={() => handleJoin(c.id)}
                  user={user}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      {!user && (
        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <div>
              <h2 className="cta-banner__title">Ready to make a difference?</h2>
              <p className="cta-banner__subtitle">Join thousands of people creating change in their communities.</p>
            </div>
            <div className="cta-banner__actions">
              <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
              <Link to="/businesses" className="btn cta-banner__secondary">View Businesses →</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function CampaignCard({ campaign: c, joined, onJoin, user }) {
  const badgeClass = CATEGORY_COLORS[c.category] || 'badge-blue';
  const progress = Math.min(100, Math.round((Number(c.participant_count) / 50) * 100));

  return (
    <div className="campaign-card">
      {/* Coloured top strip */}
      <div className={`campaign-card__strip campaign-card__strip--${c.category?.toLowerCase().replace(' ', '-')}`} />
      <div className="campaign-card__body">
        <div className="campaign-card__meta">
          <span className={`badge ${badgeClass}`}>{c.category}</span>
          <span className="campaign-card__date">
            {new Date(c.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
          </span>
        </div>
        <h3 className="campaign-card__title">{c.title}</h3>
        <p className="campaign-card__desc">
          {c.description.length > 110 ? c.description.slice(0, 110) + '…' : c.description}
        </p>
        {/* Progress bar */}
        <div className="campaign-card__progress">
          <div className="campaign-card__progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="campaign-card__footer">
          <div className="campaign-card__author">
            <div className="campaign-card__author-avatar">
              {c.author?.charAt(0).toUpperCase()}
            </div>
            <span>{c.author}</span>
          </div>
          <span className="campaign-card__participants">
            🙋 {c.participant_count} joined
          </span>
        </div>
        <button
          className={`campaign-card__join-btn ${joined ? 'joined' : ''}`}
          onClick={onJoin}
          disabled={joined}
        >
          {joined ? '✅ Joined' : user ? 'Join Campaign' : 'Sign in to Join'}
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="campaign-card">
      <div className="campaign-card__strip" style={{ background: 'var(--gray-100)' }} />
      <div className="campaign-card__body">
        <div className="skeleton" style={{ height: 20, width: '30%', marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 22, width: '80%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 16, marginBottom: 4 }} />
        <div className="skeleton" style={{ height: 16, width: '70%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 40, borderRadius: 10 }} />
      </div>
    </div>
  );
}
