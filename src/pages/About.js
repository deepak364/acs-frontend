import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './About.css';

const STATS = [
  { value: '2,400+', label: 'Community Members' },
  { value: '180+', label: 'Active Campaigns' },
  { value: '12', label: 'Campaign Categories' },
  { value: '100%', label: 'Free to Use' },
];

const VALUES = [
  {
    icon: '🌍',
    title: 'Community First',
    desc: 'Every decision we make puts the community first. This platform exists to serve the people who use it — not to generate profit or collect data.',
  },
  {
    icon: '🔒',
    title: 'Trust and Safety',
    desc: 'Every campaign is reviewed by our team before going live. We will never publish content that is misleading, harmful, or disrespectful to any group.',
  },
  {
    icon: '🤝',
    title: 'Supporting Local',
    desc: 'We believe local businesses are the backbone of healthy communities. Our business directory gives them visibility without requiring an advertising budget.',
  },
  {
    icon: '🚀',
    title: 'Accessible to Everyone',
    desc: 'The platform is completely free for individuals and businesses alike. Social awareness should not be locked behind a paywall.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create an account',
    desc: 'Register in seconds as a community member or a business owner. No subscription, no credit card, no catch.',
  },
  {
    step: '02',
    title: 'Start a campaign',
    desc: 'Write up your cause — give it a title, describe the issue, and pick a category. Submit it for our team to review.',
  },
  {
    step: '03',
    title: 'Get approved and go live',
    desc: 'Once our admin team approves your campaign, it appears on the homepage for the whole community to see and join.',
  },
  {
    step: '04',
    title: 'Build community support',
    desc: 'Community members join your campaign to show their support. Watch your participant count grow and use that momentum to create real change.',
  },
];

export default function About() {
  const { user } = useAuth();

  return (
    <div className="about">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <div className="about-hero__orb about-hero__orb--1" />
          <div className="about-hero__orb about-hero__orb--2" />
        </div>
        <div className="container about-hero__content">
          <div className="about-hero__label">About ACS Awareness</div>
          <h1 className="about-hero__title">
            A Platform Built for<br />
            <span className="about-hero__accent">People Who Care</span>
          </h1>
          <p className="about-hero__subtitle">
            Advanced Consulting Services built this platform because we believe every
            person deserves a voice in their community — and every local business
            deserves a fair chance to be found.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="about-stats">
        <div className="container">
          <div className="about-stats__grid">
            {STATS.map(s => (
              <div key={s.label} className="about-stat">
                <div className="about-stat__value">{s.value}</div>
                <div className="about-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="about-section">
        <div className="container about-two-col">
          <div className="about-two-col__text">
            <div className="about-section__label">Our Mission</div>
            <h2 className="about-section__title">
              Empowering communities through awareness and connection
            </h2>
            <p className="about-section__body">
              We started ACS Awareness because we saw a gap. People had causes they
              cared deeply about — protecting a local park, running food drives,
              raising mental health awareness — but they had no dedicated place to
              turn those passions into community action.
            </p>
            <p className="about-section__body">
              At the same time, local business owners were being drowned out by large
              corporations with massive advertising budgets. A baker, a tutor, or a
              repair technician had no simple way to reach the people right in their
              own neighbourhood.
            </p>
            <p className="about-section__body">
              ACS Awareness solves both problems in one platform — giving people a
              voice and giving businesses a community.
            </p>
          </div>
          <div className="about-two-col__visual">
            <div className="about-mission-card">
              <div className="about-mission-card__icon">🎯</div>
              <div className="about-mission-card__title">Our goal</div>
              <div className="about-mission-card__text">
                To be the most trusted community awareness platform in Australia —
                where every campaign is genuine, every business is local, and every
                voice is heard.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="about-section about-section--gray">
        <div className="container">
          <div className="about-section__header">
            <div className="about-section__label">How It Works</div>
            <h2 className="about-section__title">From idea to community impact in 4 steps</h2>
          </div>
          <div className="about-steps">
            {HOW_IT_WORKS.map(s => (
              <div key={s.step} className="about-step">
                <div className="about-step__num">{s.step}</div>
                <h3 className="about-step__title">{s.title}</h3>
                <p className="about-step__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section className="about-section">
        <div className="container">
          <div className="about-section__header">
            <div className="about-section__label">Our Values</div>
            <h2 className="about-section__title">What we stand for</h2>
          </div>
          <div className="about-values">
            {VALUES.map(v => (
              <div key={v.title} className="about-value">
                <div className="about-value__icon">{v.icon}</div>
                <h3 className="about-value__title">{v.title}</h3>
                <p className="about-value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS ACS ───────────────────────────────────── */}
      <section className="about-section about-section--gray">
        <div className="container about-two-col">
          <div className="about-two-col__text">
            <div className="about-section__label">Who We Are</div>
            <h2 className="about-section__title">
              Advanced Consulting Services
            </h2>
            <p className="about-section__body">
              Advanced Consulting Services (ACS) is a professional consulting firm
              committed to using technology to create positive social impact. We work
              with communities, government bodies, and businesses to build digital
              solutions that matter.
            </p>
            <p className="about-section__body">
              The ACS Awareness Platform is our flagship community product —
              developed by our in-house team as part of our commitment to giving back
              to the communities we serve.
            </p>
            <p className="about-section__body">
              This platform was designed, built, and deployed by our Work Integrated
              Learning development team as part of an ongoing investment in
              professional development and real-world impact.
            </p>
          </div>
          <div className="about-two-col__visual">
            <div className="about-team-card">
              <div className="about-team-card__title">Built by Team 1</div>
              <div className="about-team-card__members">
                {[
                  { name: 'Qiran Bao', role: 'Project Manager' },
                  { name: 'Deepak Kumar', role: 'Developer' },
                  { name: 'My Ngoc Doan', role: 'Developer' },
                  { name: 'Ziye Ouyang', role: 'Front-End Designer' },
                  { name: 'Rohan Nathani', role: 'Front-End Designer' },
                  { name: 'Kirshina Kumar', role: 'Data Analyst' },
                  { name: 'Shiv Kumar', role: 'Database Developer' },
                  { name: 'Vi Nghiep Lam', role: 'Tester' },
                ].map(m => (
                  <div key={m.name} className="about-team-member">
                    <div className="about-team-member__avatar">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="about-team-member__name">{m.name}</div>
                      <div className="about-team-member__role">{m.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2 className="about-cta__title">Ready to make a difference?</h2>
          <p className="about-cta__subtitle">
            Join thousands of community members already using ACS Awareness to create real change.
          </p>
          <div className="about-cta__actions">
            {!user ? (
              <>
                <Link to="/register" className="btn btn-primary btn-lg">
                  Create Free Account
                </Link>
                <Link to="/" className="about-cta__secondary">
                  Browse Campaigns →
                </Link>
              </>
            ) : (
              <>
                <Link to="/campaigns/new" className="btn btn-primary btn-lg">
                  + Create a Campaign
                </Link>
                <Link to="/" className="about-cta__secondary">
                  Browse Campaigns →
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
