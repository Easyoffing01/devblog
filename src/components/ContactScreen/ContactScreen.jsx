import React, { useState } from 'react';
import {
  MdCheck,
  MdClose,
  MdMail,
  MdPerson,
  MdAlternateEmail,
  MdCategory,
  MdExpandMore,
  MdSend,
  MdRefresh,
  MdMarkEmailRead,
  MdContentCopy,
  MdHub,
  MdForum,
  MdHelpCenter,
} from 'react-icons/md';
import './ContactScreen.css';

export const ContactScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: 'editorial',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setFormData({
        fullName: '',
        email: '',
        category: 'editorial',
        message: '',
      });

      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('editorial@devblog.io').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="contact-page">
      {/* Toast Notification */}
      {showToast && (
        <div className="contact-toast">
          <div className="toast-icon-circle">
            <MdCheck />
          </div>
          <div>
            <p className="toast-text-title">Message sent!</p>
            <p className="toast-text-sub">Our team will get back to you within 24 hours.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="search-clear-btn"
            style={{ marginLeft: '0.75rem' }}
          >
            <MdClose style={{ fontSize: '1.125rem' }} />
          </button>
        </div>
      )}

      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <div className="hero-pill-badge" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <span className="pulse-dot" />
            <span>Direct Editorial Channel</span>
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
            Get in Touch
          </h1>
          <p className="about-subhead" style={{ textAlign: 'left' }}>
            Have questions, technical feedback, or want to pitch an architectural deep-dive? Reach out directly to the DevBlog editorial &amp; engineering collective.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="contact-layout-grid">
          {/* Form Card */}
          <div className="contact-form-card">
            <div className="form-header-bar">
              <div className="form-header-title">
                <MdMail style={{ color: 'var(--color-primary)', fontSize: '1.375rem' }} />
                <span>Dispatch Message</span>
              </div>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
                Response &lt; 24h
              </span>
            </div>

            <form onSubmit={handleSubmit} className="form-fields-column">
              {/* Full Name */}
              <div>
                <label className="input-label" htmlFor="full-name">
                  Full Name
                </label>
                <div className="input-icon-wrapper">
                  <MdPerson className="input-field-icon" />
                  <input
                    id="full-name"
                    required
                    type="text"
                    placeholder="Elena Rostova"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="text-input-field"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="input-label" htmlFor="email-addr">
                  Email Address
                </label>
                <div className="input-icon-wrapper">
                  <MdAlternateEmail className="input-field-icon" />
                  <input
                    id="email-addr"
                    required
                    type="email"
                    placeholder="architect@domain.dev"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-input-field"
                  />
                </div>
              </div>

              {/* Subject Category */}
              <div>
                <label className="input-label" htmlFor="category">
                  Subject Category
                </label>
                <div className="input-icon-wrapper">
                  <MdCategory className="input-field-icon" />
                  <select
                    id="category"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select-dropdown-field"
                  >
                    <option value="editorial">Editorial Pitch (Draft Proposal)</option>
                    <option value="bug">Bug Report &amp; Platform Issue</option>
                    <option value="partnership">Developer Sponsorship &amp; Partnership</option>
                    <option value="general">General Engineering Query</option>
                  </select>
                  <MdExpandMore className="select-arrow-icon" />
                </div>
              </div>

              {/* Message Context */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="input-label" style={{ marginBottom: 0 }} htmlFor="message">
                    Message Context
                  </label>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
                    Markdown supported
                  </span>
                </div>
                <textarea
                  id="message"
                  required
                  rows={6}
                  placeholder="Outline your proposal, include links to code samples, or detail the anomaly observed..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea-field"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-submit-message"
              >
                {isSubmitting ? (
                  <>
                    <MdRefresh style={{ animation: 'spin 1s linear infinite', fontSize: '1.25rem' }} />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <MdSend style={{ fontSize: '1.25rem' }} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Info & FAQs */}
          <div className="right-info-column">
            {/* Editorial Inbox */}
            <div className="info-feature-card">
              <div className="info-card-top">
                <div className="info-card-left">
                  <div className="info-icon-badge" style={{ color: 'var(--color-primary)' }}>
                    <MdMarkEmailRead />
                  </div>
                  <div>
                    <span className="info-meta-label">Editorial Inbox</span>
                    <span className="info-meta-val">editorial@devblog.io</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="icon-btn"
                  style={{ width: '34px', height: '34px' }}
                  title="Copy editorial email"
                >
                  {copiedEmail ? (
                    <MdCheck style={{ color: 'var(--color-primary)', fontSize: '1.125rem' }} />
                  ) : (
                    <MdContentCopy style={{ fontSize: '1.125rem' }} />
                  )}
                </button>
              </div>
              <p className="info-card-desc">
                Submit drafts, pitch technical series, or request editorial peer-reviews.
              </p>
            </div>

            {/* Location Card */}
            <div className="info-feature-card">
              <div className="info-card-left">
                <div className="info-icon-badge" style={{ color: 'var(--color-tertiary)' }}>
                  <MdHub />
                </div>
                <div>
                  <span className="info-meta-label">Global Hub</span>
                  <span className="info-meta-val">San Francisco &amp; Distributed</span>
                </div>
              </div>
              <p className="info-card-desc">
                HQ: 548 Market St, San Francisco, CA. Asynchronous core team across 9 timezones.
              </p>
            </div>

            {/* Developer Network */}
            <div className="info-feature-card">
              <div className="info-card-left">
                <div className="info-icon-badge" style={{ color: 'var(--color-secondary)' }}>
                  <MdForum />
                </div>
                <div>
                  <span className="info-meta-label">Developer Network</span>
                  <span className="info-meta-val">Community Channels</span>
                </div>
              </div>
              <div className="channels-two-col">
                <a
                  className="channel-link-box"
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600 }}>#discord</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-tertiary)' }}>14.2k</span>
                </a>
                <a
                  className="channel-link-box"
                  href="https://slack.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600 }}>#slack</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-tertiary)' }}>8.9k</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="faq-box-card">
              <div className="faq-header">
                <MdHelpCenter style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }} />
                <span>Contributor Quick FAQ</span>
              </div>

              {/* Item 1 */}
              <div className="faq-item">
                <button
                  type="button"
                  onClick={() => toggleFaq(1)}
                  className="faq-question-btn"
                >
                  <span>What topics are accepted?</span>
                  <MdExpandMore
                    style={{
                      fontSize: '1.25rem',
                      transition: 'transform 0.2s ease',
                      transform: openFaq === 1 ? 'rotate(180deg)' : 'none',
                      color: openFaq === 1 ? 'var(--color-primary)' : 'inherit',
                    }}
                  />
                </button>
                {openFaq === 1 && (
                  <div className="faq-answer-body">
                    We publish deep-dive architectural post-mortems, systems programming tutorials, compiler mechanics, distributed database internals, and high-performance frontend engineering.
                  </div>
                )}
              </div>

              {/* Item 2 */}
              <div className="faq-item">
                <button
                  type="button"
                  onClick={() => toggleFaq(2)}
                  className="faq-question-btn"
                >
                  <span>Are contributors compensated?</span>
                  <MdExpandMore
                    style={{
                      fontSize: '1.25rem',
                      transition: 'transform 0.2s ease',
                      transform: openFaq === 2 ? 'rotate(180deg)' : 'none',
                      color: openFaq === 2 ? 'var(--color-primary)' : 'inherit',
                    }}
                  />
                </button>
                {openFaq === 2 && (
                  <div className="faq-answer-body">
                    Yes. Accepted technical deep dives (2,500+ words with validated code benchmarks) are remunerated through our Author Grant Program at standard industry rates ($400 - $800).
                  </div>
                )}
              </div>

              {/* Item 3 */}
              <div className="faq-item">
                <button
                  type="button"
                  onClick={() => toggleFaq(3)}
                  className="faq-question-btn"
                >
                  <span>How long does peer review take?</span>
                  <MdExpandMore
                    style={{
                      fontSize: '1.25rem',
                      transition: 'transform 0.2s ease',
                      transform: openFaq === 3 ? 'rotate(180deg)' : 'none',
                      color: openFaq === 3 ? 'var(--color-primary)' : 'inherit',
                    }}
                  />
                </button>
                {openFaq === 3 && (
                  <div className="faq-answer-body">
                    Our engineering editorial board reviews all submitted outlines within 24–48 business hours. Full draft feedback cycles typically complete within 5 business days.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
