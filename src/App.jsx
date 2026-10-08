import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';
import { HomeScreen } from './components/HomeScreen/HomeScreen.jsx';
import { AboutScreen } from './components/AboutScreen/AboutScreen.jsx';
import { ContactScreen } from './components/ContactScreen/ContactScreen.jsx';
import { ArticleScreen } from './components/ArticleScreen/ArticleScreen.jsx';
import { PostEditorModal } from './components/PostEditorModal/PostEditorModal.jsx';
import { GuidelinesModal } from './components/GuidelinesModal/GuidelinesModal.jsx';
import { INITIAL_ARTICLES } from './data/mockData';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem('devblog_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved articles', e);
      }
    }
    return INITIAL_ARTICLES;
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dark / Light mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('devblog_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Default dark as in the initial design
  });

  const [editorOpen, setEditorOpen] = useState(false);
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Sync articles to localStorage
  useEffect(() => {
    localStorage.setItem('devblog_articles', JSON.stringify(articles));
  }, [articles]);

  // Sync dark / light theme to html root element and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '#0b1326';
      document.body.style.color = '#dae2fd';
      localStorage.setItem('devblog_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
      localStorage.setItem('devblog_theme', 'light');
    }
  }, [isDarkMode]);

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleOpenArticle = (article) => {
    navigate(`/article/${article.id}`);
  };

  const handleToggleLike = (articleId) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const isLiked = !art.isLiked;
          const likes = isLiked ? art.likes + 1 : Math.max(0, art.likes - 1);
          return { ...art, isLiked, likes };
        }
        return art;
      })
    );
  };

  const handleSaveArticle = (articleData) => {
    if (articleData.id) {
      // Editing existing article
      setArticles((prev) =>
        prev.map((art) => (art.id === articleData.id ? { ...art, ...articleData } : art))
      );
    } else {
      // Creating new article
      const newArticle = {
        id: `post-${Date.now()}`,
        slug: (articleData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: articleData.title || 'Untitled Technical Article',
        subtitle: articleData.subtitle || 'Technical architectural breakdown.',
        excerpt: articleData.excerpt || 'Technical architectural breakdown.',
        category: articleData.category || 'React',
        subCategory: articleData.subCategory || 'Architecture',
        readTime: articleData.readTime || '6 min read',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
        coverImage:
          articleData.coverImage ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1kD3w0z0HtiPPYdFrLNI9h5vb2FE3Ke2XLaT7Q-XPFf7bbjM4lMJzMJb6ZAi1fIUKad2MIQnIqiDd2C8zlh7QRmNdtrqoO5PKuVvdnNAsz-2hw4NxsWcKHhe7mr1pHZpk2HIaUfiiL4rVVXqt6hGnKKputZylka6Di7QDTjItZiVueQOZcGevAUDRoIpDC-tPHE0lAczRkEzLfIHVPC2pf1bo7dabxQTe3_N2Fio8JgsdLRjnmrf',
        author: articleData.author || {
          name: 'Alex Rivera',
          role: 'Lead Architect',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7',
          bio: 'Ex-distributed systems infra engineer. Obsessed with low-latency event brokers.',
          github: 'github/alexrivera',
          twitter: '@alex_rivera',
        },
        likes: 1,
        codeSnippet: articleData.codeSnippet,
      };

      setArticles((prev) => [newArticle, ...prev]);
      navigate(`/article/${newArticle.id}`);
    }
  };

  const handleDeleteArticle = (articleId) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    navigate('/');
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setEditorOpen(true);
  };

  return (
    <div className="app-shell">
      {/* Global Navigation Header */}
      <Header
        onOpenNewPost={() => {
          setEditingArticle(null);
          setEditorOpen(true);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content View Container */}
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomeScreen
                articles={articles}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onOpenArticle={handleOpenArticle}
                onToggleLike={handleToggleLike}
                onOpenNewPost={() => {
                  setEditingArticle(null);
                  setEditorOpen(true);
                }}
                onOpenGuidelines={() => setGuidelinesOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutScreen
                onOpenNewPost={() => {
                  setEditingArticle(null);
                  setEditorOpen(true);
                }}
                onOpenGuidelines={() => setGuidelinesOpen(true)}
              />
            }
          />
          <Route path="/contact" element={<ContactScreen />} />
          <Route
            path="/article/:id"
            element={
              <ArticleScreen
                articles={articles}
                onSelectArticle={handleOpenArticle}
                onToggleLike={handleToggleLike}
                onEditArticle={handleEditArticle}
                onDeleteArticle={handleDeleteArticle}
              />
            }
          />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
        }}
        onOpenNewPost={() => {
          setEditingArticle(null);
          setEditorOpen(true);
        }}
      />

      {/* Post Editor / Draft Studio Modal */}
      <PostEditorModal
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        initialArticle={editingArticle}
      />

      {/* Editorial Guidelines Modal */}
      <GuidelinesModal
        isOpen={guidelinesOpen}
        onClose={() => setGuidelinesOpen(false)}
        onStartWriting={() => {
          setGuidelinesOpen(false);
          setEditingArticle(null);
          setEditorOpen(true);
        }}
      />
    </div>
  );
}
