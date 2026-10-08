import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdSearch,
  MdClose,
  MdLocalFireDepartment,
  MdArrowBack,
  MdArrowForward,
  MdSchedule,
  MdFavorite,
  MdFavoriteBorder,
  MdSort,
  MdGridView,
  MdViewAgenda,
  MdSearchOff,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import './HomeScreen.css';

export const HomeScreen = ({
  articles,
  selectedCategory,
  onSelectCategory,
  onOpenArticle,
  onToggleLike,
  onOpenNewPost,
  onOpenGuidelines,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    'All',
    'React',
    'CSS',
    'Career',
    'TypeScript',
    'Next.js',
    'Performance',
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.subCategory && article.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    if (sortBy === 'reading-time') {
      const getMin = (r) => parseInt(r) || 0;
      return getMin(b.readTime) - getMin(a.readTime);
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const trendingArticles = articles.filter((a) => a.trending);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage) || 1;
  const displayedArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatLikes = (count) => {
    return count > 999 ? (count / 1000).toFixed(1) + 'k' : count.toString();
  };

  const handleArticleClick = (article) => {
    if (onOpenArticle) {
      onOpenArticle(article);
    } else {
      navigate(`/article/${article.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="home-hero-glow" />
        <div className="hero-content">
          {/* Pill Badge */}
          <div className="hero-pill-badge">
            <span className="pulse-dot" />
            <span>Engineered for Technical Builders</span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline">
            Welcome to <span className="text-gradient">DevBlog</span>
          </h1>
          <p className="hero-subhead">
            The open publication for modern software engineers, frontend architects, and full-stack builders who value deep technical precision over algorithmic hype.
          </p>

          {/* Search Box */}
          <div className="hero-search-wrapper">
            <div className="hero-search-box">
              <MdSearch className="search-icon" />
              <input
                ref={searchInputRef}
                className="search-input"
                placeholder="Search architecture patterns, RSC, compiler internals, benchmarks..."
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <MdClose />
                </button>
              )}
              <div className="search-kbd-shortcut">
                <span>⌘</span>
                <span>K</span>
              </div>
              <button
                type="button"
                onClick={() => searchInputRef.current?.focus()}
                className="btn-explore"
              >
                Explore
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="category-chips-row">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="trending-section">
        <div className="section-header-row">
          <div className="trending-header-left">
            <div className="trending-fire-badge">
              <MdLocalFireDepartment />
            </div>
            <div>
              <h2 className="section-title">Trending This Week</h2>
              <p className="section-subtitle">
                Top-ranked technical papers and architectural deep-dives
              </p>
            </div>
          </div>
          <div className="trending-nav-arrows">
            <button
              type="button"
              onClick={() => {
                const first = trendingArticles[0];
                if (first) handleArticleClick(first);
              }}
              aria-label="Previous trending post"
              className="icon-btn"
            >
              <MdArrowBack />
            </button>
            <button
              type="button"
              onClick={() => {
                const last = trendingArticles[trendingArticles.length - 1];
                if (last) handleArticleClick(last);
              }}
              aria-label="Next trending post"
              className="icon-btn"
            >
              <MdArrowForward />
            </button>
          </div>
        </div>

        {/* Trending Cards Grid */}
        <div className="trending-grid">
          {trendingArticles.map((article) => (
            <article key={article.id} className="trending-card">
              <div
                className="trending-top-accent"
                style={{
                  background: `linear-gradient(90deg, var(--color-primary), var(--color-tertiary))`,
                }}
              />

              <div>
                <div className="card-tag-row">
                  <span className="tag-badge">
                    {article.subCategory || article.category}
                  </span>
                  <span className="read-time-indicator">
                    <MdSchedule />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3
                  onClick={() => handleArticleClick(article)}
                  className="card-title"
                >
                  {article.title}
                </h3>
                <p className="card-excerpt">
                  {article.excerpt}
                </p>
              </div>

              <div className="card-author-footer">
                <div className="author-info-group">
                  <img
                    className="author-mini-avatar"
                    alt={article.author.name}
                    src={article.author.avatar}
                    onError={(e) => {
                      e.target.src =
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7';
                    }}
                  />
                  <div className="author-meta-text">
                    <span className="author-name">{article.author.name}</span>
                    <span className="author-role">{article.author.role}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(article.id);
                  }}
                  className={`btn-like ${article.isLiked ? 'liked' : ''}`}
                >
                  {article.isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
                  <span>{formatLikes(article.likes)}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="latest-articles-section">
        <div className="latest-header-row">
          <div className="latest-header-title-group">
            <h2 className="section-title">Latest Articles</h2>
            <span className="dispatches-count-badge">
              {filteredArticles.length} Dispatches
            </span>
          </div>

          <div className="latest-controls-group">
            {/* Sort Dropdown */}
            <div className="sort-dropdown-box">
              <MdSort style={{ color: 'var(--color-outline)', marginRight: '4px', fontSize: '1.2rem' }} />
              <select
                aria-label="Sort articles"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Discussed</option>
                <option value="reading-time">Reading Time</option>
              </select>
            </div>

            {/* Layout Switcher */}
            <div className="layout-toggle-box">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
                className={`layout-btn ${viewMode === 'grid' ? 'active' : ''}`}
              >
                <MdGridView />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label="List View"
                className={`layout-btn ${viewMode === 'list' ? 'active' : ''}`}
              >
                <MdViewAgenda />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {displayedArticles.length === 0 && (
          <div className="empty-search-box">
            <MdSearchOff className="empty-search-icon" />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              No articles found
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="btn-explore"
              style={{ marginTop: '1rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Articles List / Grid */}
        <div className={viewMode === 'grid' ? 'articles-grid' : 'articles-list'}>
          {displayedArticles.map((article) => (
            <article key={article.id} className="article-card-item">
              <div className="article-cover-wrapper">
                <img
                  className="article-cover-img"
                  onClick={() => handleArticleClick(article)}
                  alt={article.title}
                  src={article.coverImage}
                  onError={(e) => {
                    e.target.src =
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo3RcyrCx3MEbhqK_2Y0JBKiZe6zFC-7EhccheOgkifUnLcwWB8jZIq9KJ0PVG_0a30vrJ3y_Vas-N2BqrYdsYF7OrGvWlLoCAije4Y-9kIN-NG5f9MoEzOVpBGygRWn9HEQebnw2Xak6rgwKIs6w95iYh-VnijDtvdzKlzXtCdjToe6HqqMDLQM_cNrNrDQDrRdBJaBI59mIsP1ZUfhq5lbpzsbQXgVnCAHxW9hAWwpiqums2k6WP';
                  }}
                />
                <span className="cover-category-badge">{article.category}</span>
                <span className="cover-date-badge">{article.date}</span>
              </div>

              <div className="article-body-content">
                <div>
                  <div className="article-submeta-row">
                    <span>{article.subCategory || article.category}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3
                    onClick={() => handleArticleClick(article)}
                    className="article-feed-title"
                  >
                    {article.title}
                  </h3>
                  <p className="article-feed-excerpt">
                    {article.excerpt}
                  </p>
                </div>

                <div className="article-card-footer">
                  <div className="author-left-mini">
                    <img
                      className="author-avatar-tiny"
                      alt={article.author.name}
                      src={article.author.avatar}
                      onError={(e) => {
                        e.target.src =
                          'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7';
                      }}
                    />
                    <span className="author-tiny-name">{article.author.name}</span>
                  </div>

                  <div className="footer-actions-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(article.id);
                      }}
                      className={`btn-like ${article.isLiked ? 'liked' : ''}`}
                    >
                      {article.isLiked ? <MdFavorite /> : <MdFavoriteBorder />}
                      <span>{formatLikes(article.likes)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleArticleClick(article)}
                      className="btn-read-link"
                    >
                      <span>Read</span>
                      <MdArrowForward style={{ fontSize: '1rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <p className="pagination-info-text">
            Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong>{Math.min(currentPage * itemsPerPage, sortedArticles.length)}</strong> of{' '}
            <strong>{sortedArticles.length}</strong> articles
          </p>

          <nav aria-label="Pagination" className="pagination-controls-row">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <MdChevronLeft style={{ fontSize: '1.25rem' }} />
              <span>Previous</span>
            </button>

            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((pageNum) => (
              <button
                type="button"
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > 3 && (
              <>
                <span style={{ padding: '0 4px', color: 'var(--color-outline)' }}>…</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(totalPages)}
                  className={`pagination-num-btn ${currentPage === totalPages ? 'active' : ''}`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <span>Next</span>
              <MdChevronRight style={{ fontSize: '1.25rem' }} />
            </button>
          </nav>
        </div>
      </section>

      {/* Guild Bento Banner */}
      <section className="guild-bento-section">
        <div className="guild-bento-card">
          <div className="guild-text-content">
            <span className="guild-tag-title">DevBlog Writers Guild</span>
            <h2 className="guild-headline">
              Publish Your Technical Insights to 180,000+ Engineers
            </h2>
            <p className="guild-description">
              Direct monetization, zero advertising interference, syntax highlighting with custom compilers, and automated syndicate delivery to GitHub &amp; RSS.
            </p>
          </div>
          <div className="guild-actions-row">
            <button
              type="button"
              onClick={onOpenNewPost}
              className="btn-start-writing"
            >
              Start Writing
            </button>
            <button
              type="button"
              onClick={onOpenGuidelines}
              className="btn-guidelines-outline"
            >
              Editorial Guidelines
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
