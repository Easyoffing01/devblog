import React from 'react';
import {
  MdArrowDownward,
  MdVerified,
  MdArticle,
  MdGroups,
  MdTerminal,
  MdDiversity3,
  MdArchitecture,
  MdCode,
  MdShare,
  MdEditDocument,
  MdEditSquare,
  MdMenuBook,
  MdMemory,
  MdHub,
  MdEditNote,
  MdSecurity,
} from 'react-icons/md';
import { CORE_TEAM_MEMBERS } from '../../data/mockData';
import './AboutScreen.css';

export const AboutScreen = ({
  onOpenNewPost,
  onOpenGuidelines,
}) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderMemberIcon = (iconName) => {
    switch (iconName) {
      case 'memory':
        return <MdMemory style={{ fontSize: '1.125rem', color: 'var(--color-primary)' }} />;
      case 'hub':
        return <MdHub style={{ fontSize: '1.125rem', color: 'var(--color-primary)' }} />;
      case 'edit_note':
        return <MdEditNote style={{ fontSize: '1.125rem', color: 'var(--color-primary)' }} />;
      case 'security':
        return <MdSecurity style={{ fontSize: '1.125rem', color: 'var(--color-primary)' }} />;
      default:
        return <MdCode style={{ fontSize: '1.125rem', color: 'var(--color-primary)' }} />;
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="manifesto-pill">
            <span className="pulse-dot" />
            <span>ENGINEERING MANIFESTO v2.4</span>
          </div>

          <h1 className="about-title">
            About <span className="text-gradient">DevBlog</span>
          </h1>

          <p className="about-subhead">
            An open, community-driven publication engineered exclusively for systems builders and software craftsmen. Built transparently on web standards, strictly free of paywalls, algorithmic churn, and intrusive analytics trackers.
          </p>

          <div className="about-hero-buttons">
            <button
              type="button"
              onClick={() => scrollTo('core-team')}
              className="btn-start-writing"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Meet the Team</span>
              <MdArrowDownward style={{ fontSize: '1.25rem' }} />
            </button>
            <button
              type="button"
              onClick={() => scrollTo('core-values')}
              className="btn-guidelines-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>Our Standards</span>
              <MdVerified style={{ fontSize: '1.25rem', color: 'var(--color-tertiary)' }} />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Stat Bento Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          {/* Stat 1 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-primary)' }}>
              <MdArticle />
            </div>
            <span className="stat-number">128+</span>
            <span className="stat-label" style={{ color: 'var(--color-primary)' }}>Posts Published</span>
            <p className="stat-desc">
              Rigorous peer-reviewed post-mortems, distributed systems architecture reviews, and runtimes.
            </p>
            <div className="stat-footer-bar">
              <span>ACCEPTANCE RATE</span>
              <span style={{ color: 'var(--color-tertiary)', fontWeight: 600 }}>14.2%</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-secondary)' }}>
              <MdGroups />
            </div>
            <span className="stat-number">5,400+</span>
            <span className="stat-label" style={{ color: 'var(--color-secondary)' }}>Active Developers</span>
            <p className="stat-desc">
              Global systems architects, principal designers, and infrastructure teams exchanging insights daily.
            </p>
            <div className="stat-footer-bar">
              <span>WEEKLY RETENTION</span>
              <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>88.7%</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: 'var(--color-tertiary)' }}>
              <MdTerminal />
            </div>
            <span className="stat-number">42+</span>
            <span className="stat-label" style={{ color: 'var(--color-tertiary)' }}>Open Source Contributors</span>
            <p className="stat-desc">
              Decentralized engineering committers maintaining our parsers, markdown compiler, and layout engine.
            </p>
            <div className="stat-footer-bar">
              <span>MERGED PRS</span>
              <span style={{ color: 'var(--color-tertiary)', fontWeight: 600 }}>312</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section" id="core-values">
        <div>
          <span className="section-tag-mono">Fundamental Tenets</span>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>Core Values</h2>
          <p className="about-subhead" style={{ marginTop: '0.5rem', textAlign: 'left' }}>
            How we curate editorial velocity without conceding technical accuracy.
          </p>
        </div>

        <div className="values-grid">
          {/* Pillar 01 */}
          <div className="pillar-card">
            <div>
              <div className="pillar-icon-box" style={{ color: 'var(--color-primary)' }}>
                <MdDiversity3 />
              </div>
              <span className="pillar-num">Pillar 01</span>
              <h3 className="pillar-title">Community First</h3>
              <p className="pillar-desc">
                Peer-reviewed knowledge sharing. Every substantive article is reviewed by verified domain practitioners to eliminate speculation and guarantee production-readiness.
              </p>
            </div>
            <div className="pillar-protocol-box">
              <span className="protocol-tag" style={{ color: 'var(--color-primary)' }}>
                // Editorial Protocol
              </span>
              <p className="protocol-text">
                Double-blind technical validation before any manuscript reaches production feeds.
              </p>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="pillar-card">
            <div>
              <div className="pillar-icon-box" style={{ color: 'var(--color-tertiary)' }}>
                <MdArchitecture />
              </div>
              <span className="pillar-num">Pillar 02</span>
              <h3 className="pillar-title">Learn by Building</h3>
              <p className="pillar-desc">
                Production-grade code examples and architectural deep dives. We skip toy demonstrations in favor of observable failure states, benchmarks, and realistic microbenchmarks.
              </p>
            </div>
            <div className="pillar-protocol-box">
              <span className="protocol-tag" style={{ color: 'var(--color-tertiary)' }}>
                // Reproducibility Spec
              </span>
              <p className="protocol-text">
                All referenced codebases ship with automated verification tests and reproduction repos.
              </p>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="pillar-card">
            <div>
              <div className="pillar-icon-box" style={{ color: 'var(--color-secondary)' }}>
                <MdCode />
              </div>
              <span className="pillar-num">Pillar 03</span>
              <h3 className="pillar-title">Open Source</h3>
              <p className="pillar-desc">
                Built in the open with modern web standards. Our platform, parsers, and custom markdown extensions are freely licensed and publicly audited on GitHub.
              </p>
            </div>
            <div className="pillar-protocol-box">
              <span className="protocol-tag" style={{ color: 'var(--color-secondary)' }}>
                // AGPLv3 Core
              </span>
              <p className="protocol-text">
                Forkable, sovereign, and decoupled from proprietary publishing silos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Core Team Section */}
      <section className="team-section" id="core-team">
        <div className="team-header-row">
          <div>
            <span className="section-tag-mono">Personnel</span>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Meet the Core Team</h2>
            <p className="about-subhead" style={{ marginTop: '0.5rem', textAlign: 'left' }}>
              Engineers and writers steering DevBlog towards high-signal, zero-fluff software education.
            </p>
          </div>
          <div className="team-stats-badge">
            <span className="pulse-dot" style={{ backgroundColor: 'var(--color-primary)' }} />
            <span>4 CORE DIRECTORS • 100% REMOTE</span>
          </div>
        </div>

        <div className="team-grid">
          {CORE_TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="team-member-card">
              <div>
                <div className="team-avatar-wrapper">
                  <img
                    className="team-avatar-img"
                    alt={member.name}
                    src={member.avatar}
                    onError={(e) => {
                      e.target.src =
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7';
                    }}
                  />
                  <div className="team-avatar-badge">
                    {renderMemberIcon(member.icon)}
                  </div>
                </div>

                <div className="team-text-area">
                  <h4 className="team-name">{member.name}</h4>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>

              <div className="team-social-footer">
                <a
                  className="team-social-link"
                  href={`https://${member.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MdCode style={{ fontSize: '1.125rem' }} />
                  <span>github</span>
                </a>
                <span style={{ color: 'var(--color-outline)' }}>•</span>
                <a
                  className="team-social-link"
                  href={`https://twitter.com/${member.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MdShare style={{ fontSize: '1.125rem' }} />
                  <span>twitter</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Community Banner */}
      <section className="community-cta-section">
        <div className="community-cta-card">
          <div style={{ maxWidth: '40rem' }}>
            <div className="manifesto-pill" style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
              <MdEditDocument style={{ fontSize: '0.875rem' }} />
              <span>OPEN SUBMISSIONS ACTIVE</span>
            </div>
            <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Join our community of contributors
            </h3>
            <p className="about-subhead" style={{ textAlign: 'left', fontSize: '0.9375rem' }}>
              Have you solved a hard distributed concurrency bug? Migrated a monolithic DB with zero downtime? Write for DevBlog and put your expertise directly in front of thousands of software builders.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenNewPost}
              className="btn-start-writing"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MdEditSquare style={{ fontSize: '1.25rem' }} />
              <span>Start Writing</span>
            </button>
            <button
              type="button"
              onClick={onOpenGuidelines}
              className="btn-guidelines-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MdMenuBook style={{ fontSize: '1.25rem' }} />
              <span>Author Guidelines</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
