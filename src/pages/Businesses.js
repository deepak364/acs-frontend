import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './Businesses.css';

const BIZ_ICONS = {
  'Food & Beverage': '🍽️', 'Retail': '🛍️', 'Health & Wellness': '💪',
  'Technology': '💻', 'Education': '📚', 'Services': '🔧', 'Other': '🏪'
};

export default function Businesses() {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Food & Beverage', 'Retail', 'Health & Wellness', 'Technology', 'Education', 'Services', 'Other'];

  useEffect(() => {
    API.get('/businesses')
      .then(res => setBusinesses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = businesses.filter(b => {
    const matchCat = filter === 'All' || b.category === filter;
    const matchSearch = b.biz_name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="businesses page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="businesses__header">
          <div>
            <h1 className="section-title">Local Business Directory</h1>
            <p className="section-subtitle">
              Discover and support {businesses.length} local businesses in your community
            </p>
          </div>
          {user?.role === 'business_owner' && (
            <Link to="/business/new" className="btn btn-primary">
              + List My Business
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
              placeholder="Search businesses..."
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
                {cat !== 'All' && BIZ_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="biz-card">
                <div className="skeleton" style={{ height: 20, width: '30%', marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 22, width: '70%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 16, marginBottom: 4 }} />
                <div className="skeleton" style={{ height: 16, width: '60%' }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No businesses found</h3>
            <p>Try a different search or be the first to list yours!</p>
            {user?.role === 'business_owner' && (
              <Link to="/business/new" className="btn btn-primary" style={{ marginTop: 16 }}>
                Add Your Business
              </Link>
            )}
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(b => <BizCard key={b.id} biz={b} />)}
          </div>
        )}

        {/* CTA for non-business users */}
        {user && user.role === 'user' && (
          <div className="businesses__cta">
            <div className="businesses__cta-icon">🏪</div>
            <div>
              <h3>Do you own a business?</h3>
              <p>Register as a business owner to list your business here and reach thousands of community members.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BizCard({ biz: b }) {
  const icon = BIZ_ICONS[b.category] || '🏪';
  return (
    <div className="biz-card">
      <div className="biz-card__icon-wrap">
        <span className="biz-card__icon">{icon}</span>
        <span className="badge badge-blue">{b.category}</span>
      </div>
      <h3 className="biz-card__name">{b.biz_name}</h3>
      <p className="biz-card__desc">
        {b.description.length > 110 ? b.description.slice(0, 110) + '…' : b.description}
      </p>
      <div className="biz-card__divider" />
      <div className="biz-card__footer">
        <div className="biz-card__owner">
          <div className="biz-card__owner-avatar">
            {b.owner_name?.charAt(0).toUpperCase()}
          </div>
          <span>{b.owner_name}</span>
        </div>
        <a href={`tel:${b.contact}`} className="biz-card__contact" onClick={e => e.stopPropagation()}>
          📞 {b.contact}
        </a>
      </div>
    </div>
  );
}
