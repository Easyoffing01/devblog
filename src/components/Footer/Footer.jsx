import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdTerminal,
  MdForum,
  MdChat,
  MdRssFeed,
  MdCheck,
  MdArrowForward,
} from "react-icons/md";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { CATEGORIES_WITH_COUNTS } from "../../data/mockData";
import "./Footer.css";

export const Footer = ({ onSelectCategory, onOpenNewPost }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [footerNotice, setFooterNotice] = useState(null);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }, 2000);
  };

  const showNotice = (msg) => {
    setFooterNotice(msg);
    setTimeout(() => setFooterNotice(null), 3000);
  };

  const handleCategoryClick = (categoryKey) => {
    onSelectCategory?.(categoryKey);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="devblog-footer">
      {footerNotice && <div className="footer-toast">{footerNotice}</div>}

      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link
              to="/"
              className="brand-link"
              style={{ width: "fit-content" }}
            >
              <div className="brand-logo-badge">
                <div className="brand-logo-inner">
                  <MdTerminal style={{ fontSize: "1.125rem" }} />
                </div>
              </div>
              <span className="brand-title">DevBlog</span>
            </Link>
            <p className="footer-desc">
              The high-signal publication platform engineered for software
              architects, systems engineers, and technical builders who value
              precision over noise.
            </p>
            <div className="footer-social-row">
              <Link
                aria-label="GitHub Code Repository"
                className="footer-social-btn"
                to="https://github.com/Easyoffing01/devblog"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </Link>
              <Link
                to="https://wa.me/+2348138283474"
                aria-label="Discussion Network"
                type="button"
                className="footer-social-btn"
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  showNotice(
                    "Community discussions: Discord #architecture & GitHub Discussions.",
                  )
                }
              >
                <FaWhatsapp />
              </Link>

              <Link
                to="https://www.linkedin.com/in/israel-ayeni-94b329208/?isSelfProfile=true"
                aria-label="Community Chat"
                className="footer-social-btn"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </Link>
              <button
                type="button"
                aria-label="RSS Syndicate Feed"
                className="footer-social-btn"
                onClick={() =>
                  showNotice("RSS Syndication: /feed.xml is operational.")
                }
              >
                <MdRssFeed />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <nav className="footer-links-list">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-link-btn"
              >
                Home Feed
              </Link>
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-link-btn"
              >
                Engineering Manifest
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-link-btn"
              >
                Author Inquiries
              </Link>
              <button
                type="button"
                onClick={() => onOpenNewPost?.()}
                className="footer-link-btn"
              >
                Draft Studio
              </button>
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="footer-link-btn"
              >
                Developer Profile
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-col-title">Categories</h4>
            <nav className="footer-links-list">
              {CATEGORIES_WITH_COUNTS.map((cat) => (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.filterKey)}
                  className="footer-cat-row"
                >
                  <span>{cat.name}</span>
                  <span className="footer-cat-badge">{cat.count}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Dispatch Newsletter */}
          <div className="footer-newsletter-box">
            <h4 className="footer-col-title">Dispatch Newsletter</h4>
            <p className="footer-desc">
              Receive weekly deep dives on distributed systems, frontend
              compilers, and system design.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-group">
                <input
                  className="newsletter-input"
                  placeholder="engineer@domain.com"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button
                  aria-label="Subscribe"
                  className="newsletter-submit-btn"
                  type="submit"
                >
                  {subscribed ? <MdCheck /> : <MdArrowForward />}
                </button>
              </div>
              <span className="newsletter-note">
                {subscribed
                  ? "✓ Subscribed successfully! Welcome aboard."
                  : "Zero marketing spam. Unsubscribe anytime."}
              </span>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 DevBlog Inc. Engineered for precision.
          </p>
          <div className="footer-legal-links">
            <button
              type="button"
              onClick={() =>
                showNotice(
                  "Privacy Policy: DevBlog does not use tracking cookies or sell telemetry.",
                )
              }
              className="footer-legal-btn"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() =>
                showNotice(
                  "Terms of Service: Technical content is distributed under open peer review.",
                )
              }
              className="footer-legal-btn"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() =>
                showNotice(
                  "Security Status: 99.99% uptime across all edge edge-proxy nodes.",
                )
              }
              className="footer-legal-btn"
            >
              <span className="status-pulse-dot" />
              <span>Security Status</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
