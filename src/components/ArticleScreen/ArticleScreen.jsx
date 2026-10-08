import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MdArrowBack,
  MdBookmark,
  MdBookmarkBorder,
  MdShare,
  MdSchedule,
  MdLink,
  MdBookmarkAdd,
  MdElectricBolt,
  MdCheck,
  MdContentCopy,
  MdCheckCircle,
  MdFavorite,
  MdFavoriteBorder,
  MdEdit,
  MdDeleteForever,
  MdPersonAdd,
  MdTerminal,
  MdAlternateEmail,
  MdRssFeed,
  MdArrowForward,
  MdAccountTree,
} from 'react-icons/md';
import './ArticleScreen.css';

export const ArticleScreen = ({
  article: propArticle,
  articles = [],
  relatedArticles: propRelatedArticles,
  onBack: propOnBack,
  onSelectArticle,
  onToggleLike,
  onEditArticle,
  onDeleteArticle,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find article by url param id/slug if available, otherwise propArticle
  const article =
    (id && articles.find((a) => a.id === id || a.slug === id)) ||
    propArticle ||
    articles[0];

  const relatedArticles =
    propRelatedArticles ||
    articles.filter((a) => a.id !== (article && article.id));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(article?.isBookmarked || false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>Article not found</h2>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-start-writing"
          style={{ marginTop: '1rem', display: 'inline-block' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  const copyCodeSnippet = (codeText) => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  const handleConfirmDelete = () => {
    onDeleteArticle(article.id);
    setShowDeleteConfirm(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRelated = (rel) => {
    if (onSelectArticle) {
      onSelectArticle(rel);
    }
    navigate(`/article/${rel.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="article-page">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-dialog-box">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>Delete this article?</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', marginTop: '0.5rem', lineHeight: 1.5 }}>
              This action cannot be undone. Are you sure you want to remove &ldquo;{article.title}&rdquo;?
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-guidelines-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-error)',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Top Reading Bar */}
      <div className="sticky-reading-bar">
        <div className="reading-bar-inner">
          <div className="reading-bar-left">
            <button
              type="button"
              onClick={handleBack}
              className="btn-back-compact"
            >
              <MdArrowBack style={{ fontSize: '1.125rem' }} />
              <span>Back to Articles</span>
            </button>

            <div className="reading-breadcrumbs">
              <span>/</span>
              <span style={{ color: 'var(--color-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>
                {article.subCategory || article.category}
              </span>
              <span>/</span>
              <span style={{ color: 'var(--color-on-surface)', fontFamily: 'Inter, sans-serif', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {article.title}
              </span>
            </div>
          </div>

          <div className="reading-bar-actions">
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark article"
              className="icon-btn"
              style={{ width: '36px', height: '36px' }}
              title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
            >
              {isBookmarked ? (
                <MdBookmark style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }} />
              ) : (
                <MdBookmarkBorder style={{ fontSize: '1.25rem' }} />
              )}
            </button>

            <button
              type="button"
              onClick={copyArticleLink}
              aria-label="Share article"
              className="icon-btn"
              style={{ width: '36px', height: '36px' }}
              title="Share article link"
            >
              {copiedLink ? (
                <MdCheck style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }} />
              ) : (
                <MdShare style={{ fontSize: '1.25rem' }} />
              )}
            </button>
          </div>
        </div>

        {/* Progress Gauge */}
        <div className="reading-gauge-container">
          <div
            className="reading-gauge-fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Article Container */}
      <article className="article-main-container">
        <div className="article-prose-column">
          {/* Header */}
          <header className="article-header">
            <div className="article-taxonomy-row">
              <span className="tag-badge">
                {article.subCategory || article.category}
              </span>
              {article.rfcNumber && (
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
                  {article.rfcNumber}
                </span>
              )}
            </div>

            <h1 className="article-page-title">
              {article.title}
            </h1>

            <p className="article-page-subtitle">
              {article.subtitle || article.excerpt}
            </p>

            {/* Author Byline */}
            <div className="author-byline-bar">
              <div className="author-byline-left">
                <img
                  alt={article.author.name}
                  className="author-big-avatar"
                  src={article.author.avatar}
                  onError={(e) => {
                    e.target.src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7';
                  }}
                />
                <div>
                  <div className="author-name-and-role">
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                      {article.author.name}
                    </span>
                    <span className="dropdown-user-badge">
                      {article.author.role}
                    </span>
                  </div>
                  <div className="author-meta-sub">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MdSchedule style={{ fontSize: '0.875rem' }} />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={copyArticleLink}
                  className="btn-guidelines-outline"
                  style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {copiedLink ? <MdCheck style={{ color: 'var(--color-primary)' }} /> : <MdLink />}
                  <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Add to bookmarks"
                  className="icon-btn"
                  style={{ width: '32px', height: '32px' }}
                >
                  <MdBookmarkAdd style={{ fontSize: '1.125rem' }} />
                </button>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="article-hero-graphic-box">
            <img
              className="article-hero-img"
              alt="Architecture blueprint"
              src={article.coverImage}
              onError={(e) => {
                e.target.src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1kD3w0z0HtiPPYdFrLNI9h5vb2FE3Ke2XLaT7Q-XPFf7bbjM4lMJzMJb6ZAi1fIUKad2MIQnIqiDd2C8zlh7QRmNdtrqoO5PKuVvdnNAsz-2hw4NxsWcKHhe7mr1pHZpk2HIaUfiiL4rVVXqt6hGnKKputZylka6Di7QDTjItZiVueQOZcGevAUDRoIpDC-tPHE0lAczRkEzLfIHVPC2pf1bo7dabxQTe3_N2Fio8JgsdLRjnmrf';
              }}
            />
            <div className="hero-img-gradient-overlay" />
            <div className="hero-img-caption-badge">
              <MdAccountTree style={{ color: 'var(--color-tertiary)', fontSize: '1rem' }} />
              <span>{article.figureCaption || 'Figure 1: RSC Serialization Protocol & Suspense Pipeline'}</span>
            </div>
          </div>

          {/* Prose Body */}
          <div className="article-prose-body">
            {/* Callout */}
            <aside className="callout-box">
              <div className="callout-accent-bar" />
              <div className="callout-inner">
                <MdElectricBolt style={{ color: 'var(--color-primary)', fontSize: '1.5rem', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    The Paradigm Shift
                  </h4>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-on-surface-variant)', marginTop: '4px', lineHeight: 1.6 }}>
                    React Server Components are not SSR 2.0. While traditional SSR translates trees into static HTML strings on initial load, RSC preserves continuous component state on the client while delegating heavy compute and secret queries purely to the edge runtime.
                  </p>
                </div>
              </div>
            </aside>

            <p>
              For over a decade, our mental model required serializing application state via JSON APIs, sending massive runtime packages over mobile networks, and executing hydration passes that blocked main execution threads. With React 19&apos;s finalized async primitives, that baseline is officially obsolete.
            </p>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-on-surface)', marginTop: '1rem' }}>
              1. Zero-Bundle Dependencies with Asynchronous Server Primitives
            </h2>

            <p>
              Consider this canonical pattern: formatting markdown, cryptographic hashes, or localized currency tables. On the client, this introduces hundreds of kilobytes of parser trees. In an RSC environment, those dependencies remain strictly isolated on the backend server.
            </p>

            {/* Code Block */}
            {article.codeSnippet && (
              <div className="code-snippet-box">
                <div className="code-header-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="code-window-dots">
                      <span className="window-dot" style={{ backgroundColor: '#ef4444' }} />
                      <span className="window-dot" style={{ backgroundColor: '#eab308' }} />
                      <span className="window-dot" style={{ backgroundColor: '#10b981' }} />
                    </div>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginLeft: '6px' }}>
                      {article.codeSnippet.path}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-tertiary)' }}>
                      {article.codeSnippet.language}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyCodeSnippet(article.codeSnippet.code)}
                      className="btn-guidelines-outline"
                      style={{ padding: '2px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedCode ? <MdCheck style={{ color: 'var(--color-primary)' }} /> : <MdContentCopy />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <pre className="code-pre-box">
                  <code>{article.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            <p>
              Notice that neither database drivers nor query serialization logic ever cross the wire. The client receives a compressed stream of UI virtual-dom instructions that hydrate asynchronously without re-executing layout cycles.
            </p>

            {/* Quote */}
            <blockquote className="devblog-quote-box">
              <p className="quote-text">
                &ldquo;Streaming isn&apos;t merely an optimization for slow networks—it fundamentally rewires frontend latency from waterfall bottlenecks into progressive value delivery.&rdquo;
              </p>
              <footer className="quote-author">
                — React Core RFC Commentary #219
              </footer>
            </blockquote>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-on-surface)', marginTop: '0.5rem' }}>
              Key Takeaways for Senior Architects
            </h3>

            {/* Takeaways */}
            <ul className="takeaway-checklist">
              {(article.keyTakeaways || [
                {
                  title: 'Decoupled Server Boundaries:',
                  description:
                    'Prevent client-side bundle bloat by keeping computational libraries on backend edge sandboxes.',
                },
                {
                  title: 'Granular Suspense Skeletons:',
                  description:
                    'Stream essential structural chrome immediately while heavy microservices populate independently.',
                },
                {
                  title: 'Instant Form Actions:',
                  description:
                    'Execute mutations with automatic cache invalidation and optimistic rollbacks built into native web standards.',
                },
              ]).map((item, idx) => (
                <li key={idx} className="takeaway-item">
                  <MdCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
                      {item.title}
                    </strong>
                    <span style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.875rem', display: 'block', marginTop: '2px' }}>
                      {item.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <p>
              By adopting streaming architectures at scale, teams report up to 64% reductions in initial chunk parsing times and nearly flawless Lighthouse performance scores across international regions. The future belongs to hybrid computing pipelines where boundaries are defined by data lifecycle rather than device constraints.
            </p>
          </div>

          {/* Engagement Bar */}
          <section className="engagement-action-bar">
            <div className="engagement-social-group">
              <button
                type="button"
                onClick={() => onToggleLike(article.id)}
                className={`btn-social-action ${article.isLiked ? 'liked' : ''}`}
              >
                {article.isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
                <span>{article.likes} likes</span>
              </button>

              <button
                type="button"
                onClick={copyArticleLink}
                className="btn-social-action"
              >
                <MdShare />
                <span>Share</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
                Author Admin:
              </span>
              <button
                type="button"
                onClick={() => onEditArticle(article)}
                className="btn-guidelines-outline"
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <MdEdit style={{ fontSize: '1rem' }} />
                <span>Edit Post</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-error-container)',
                  color: 'var(--color-on-error-container)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <MdDeleteForever style={{ fontSize: '1rem' }} />
                <span>Delete Post</span>
              </button>
            </div>
          </section>

          {/* Author Bio Card */}
          <section className="author-bio-card">
            <img
              alt={article.author.name}
              className="author-large-avatar"
              src={article.author.avatar}
              onError={(e) => {
                e.target.src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7';
              }}
            />
            <div className="author-bio-details">
              <div className="author-bio-top-row">
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    {article.author.name}
                  </h3>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-tertiary)' }}>
                    {article.author.role} @ DevBlog
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`btn-follow-toggle ${isFollowing ? 'following' : ''}`}
                >
                  {isFollowing ? <MdCheck /> : <MdPersonAdd />}
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </button>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                {article.author.bio ||
                  'Writing deep dives on distributed systems, compiler architecture, and WebAssembly integration. Maintainer of several open-source reactive streaming micro-libraries and frequent conference speaker.'}
              </p>

              <div className="author-social-links-row">
                {article.author.github && (
                  <a
                    className="team-social-link"
                    href={`https://${article.author.github}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MdTerminal style={{ fontSize: '1rem' }} />
                    <span>{article.author.github}</span>
                  </a>
                )}
                {article.author.twitter && (
                  <a
                    className="team-social-link"
                    href={`https://twitter.com/${article.author.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MdAlternateEmail style={{ fontSize: '1rem' }} />
                    <span>{article.author.twitter}</span>
                  </a>
                )}
                <a
                  className="team-social-link"
                  href="#rss"
                  onClick={(e) => e.preventDefault()}
                >
                  <MdRssFeed style={{ fontSize: '1rem' }} />
                  <span>Substack</span>
                </a>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="related-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '4px', height: '24px', borderRadius: '9999px', backgroundColor: 'var(--color-primary)' }} />
                <h2 className="section-title">Related Technical Deep Dives</h2>
              </div>
              <button
                type="button"
                onClick={handleBack}
                className="btn-read-link"
              >
                <span>Explore All</span>
                <MdArrowForward style={{ fontSize: '1rem' }} />
              </button>
            </div>

            <div className="related-grid-two-col">
              {relatedArticles.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => handleSelectRelated(rel)}
                  className="article-card-item"
                  style={{ cursor: 'pointer', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <div style={{ position: 'relative', width: '100%', height: '11rem', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt={rel.title}
                        src={rel.coverImage}
                        onError={(e) => {
                          e.target.src =
                            'https://lh3.googleusercontent.com/aida-public/AB6AXuDKfxV6aaLf3EhX7ai2QDvQVnSrqoW0LE1mDLm227vkNYVbHd4Zdly8gAF7yrIbKo2YqS8QYrrwQI1yHG4G-eNbjbjtSAghnHWYH4-se5m2WGTLU_HUi1PZKRJS3P2efYLaeXSdmhuMUCiOyjhv-NlOfY1vDlw0m-KiVCpuGoh2spZu_yKzcvlKxyjSFgjmb6UrzXK69QkEJVNwJ_DltDs5lIJc7nqGvXmGhZ_MhkTkFar_TQ5ZGcEK';
                        }}
                      />
                      <span className="cover-category-badge">
                        {rel.subCategory || rel.category}
                      </span>
                    </div>

                    <h3 className="card-title">
                      {rel.title}
                    </h3>
                    <p className="card-excerpt">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-outline)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MdSchedule style={{ fontSize: '0.875rem' }} />
                      <span>{rel.readTime}</span>
                    </span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <span>Read</span>
                      <MdArrowForward style={{ fontSize: '0.875rem' }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};
