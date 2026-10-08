import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MdTerminal,
  MdDarkMode,
  MdLightMode,
  MdAdd,
  MdPerson,
  MdEditNote,
  MdLogout,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import './Header.css';

export const Header = ({ onOpenNewPost, isDarkMode, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [headerNotice, setHeaderNotice] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/' || location.pathname.startsWith('/article');
  const isAbout = location.pathname === '/about';
  const isContact = location.pathname === '/contact';

  const showToast = (msg) => {
    setHeaderNotice(msg);
    setTimeout(() => setHeaderNotice(null), 3000);
  };

  return (
    <>
      {headerNotice && (
        <div className="header-toast-notice">
          {headerNotice}
        </div>
      )}

      <header className="devblog-header">
        <div className="header-container">
          {/* Logo & Navigation */}
          <div className="header-left">
            <Link to="/" className="brand-link">
              <div className="brand-logo-badge">
                <div className="brand-logo-inner">
                  <MdTerminal />
                </div>
              </div>
              <span className="brand-title">DevBlog</span>
            </Link>

            <nav className="header-nav">
              <Link
                to="/"
                className={`nav-link ${isHome ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`nav-link ${isAbout ? 'active' : ''}`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`nav-link ${isContact ? 'active' : ''}`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="header-right">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle color scheme"
              className="icon-btn"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>

            {/* New Post Button */}
            <button
              type="button"
              onClick={onOpenNewPost}
              className="btn-new-post"
            >
              <MdAdd style={{ fontSize: '1.125rem' }} />
              <span>New Post</span>
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="profile-avatar-btn"
                aria-label="User profile menu"
              >
                <img
                  alt="Profile Alex Rivera"
                  className="avatar-img"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7"
                />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="dropdown-backdrop"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="profile-dropdown-menu">
                    <div className="dropdown-user-info">
                      <p className="dropdown-user-name">Alex Rivera</p>
                      <p className="dropdown-user-email">alex@devblog.io</p>
                      <span className="dropdown-user-badge">Lead Architect</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/about');
                      }}
                      className="dropdown-action-btn"
                    >
                      <MdPerson style={{ fontSize: '1.125rem' }} />
                      <span>Profile &amp; Team</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenNewPost();
                      }}
                      className="dropdown-action-btn"
                    >
                      <MdEditNote style={{ fontSize: '1.125rem' }} />
                      <span>Draft Studio</span>
                    </button>

                    <div className="dropdown-divider" />

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        showToast('Currently signed in as Alex Rivera (Lead Architect).');
                      }}
                      className="dropdown-action-btn danger"
                    >
                      <MdLogout style={{ fontSize: '1.125rem' }} />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="icon-btn mobile-menu-btn"
            >
              <MdMenu style={{ fontSize: '1.4rem' }} />
            </button>
          </div>
        </div>

        {/* Accent Progress Indicator */}
        <div className="header-indicator-bar">
          <div
            className="header-indicator-fill"
            style={{
              width: isHome ? '25%' : isAbout ? '50%' : isContact ? '75%' : '100%',
            }}
          />
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay">
          <div className="mobile-drawer-header">
            <div className="brand-link">
              <div className="brand-logo-badge">
                <div className="brand-logo-inner">
                  <MdTerminal />
                </div>
              </div>
              <span className="brand-title">DevBlog</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="icon-btn"
            >
              <MdClose style={{ fontSize: '1.4rem' }} />
            </button>
          </div>

          <nav className="mobile-drawer-nav">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-item ${isHome ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-item ${isAbout ? 'active' : ''}`}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`mobile-nav-item ${isContact ? 'active' : ''}`}
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenNewPost();
              }}
              className="btn-new-post"
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '0.75rem',
                marginTop: '1rem',
              }}
            >
              <MdAdd style={{ fontSize: '1.25rem' }} />
              <span>New Post</span>
            </button>
          </nav>

          <div className="mobile-drawer-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                alt="Profile"
                className="avatar-img"
                style={{ width: '40px', height: '40px' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7"
              />
              <div>
                <p className="dropdown-user-name">Alex Rivera</p>
                <p className="dropdown-user-email">alex@devblog.io</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              className="icon-btn"
            >
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
