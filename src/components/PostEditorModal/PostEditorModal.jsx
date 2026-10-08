import React, { useState } from 'react';
import {
  MdEditSquare,
  MdClose,
  MdPublish,
} from 'react-icons/md';
import './PostEditorModal.css';

const PRESET_COVERS = [
  {
    name: 'Distributed Nodes & Sharding',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU1kD3w0z0HtiPPYdFrLNI9h5vb2FE3Ke2XLaT7Q-XPFf7bbjM4lMJzMJb6ZAi1fIUKad2MIQnIqiDd2C8zlh7QRmNdtrqoO5PKuVvdnNAsz-2hw4NxsWcKHhe7mr1pHZpk2HIaUfiiL4rVVXqt6hGnKKputZylka6Di7QDTjItZiVueQOZcGevAUDRoIpDC-tPHE0lAczRkEzLfIHVPC2pf1bo7dabxQTe3_N2Fio8JgsdLRjnmrf',
  },
  {
    name: 'Serverless Graph Schematics',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Sji_QI5glRigZMl1sn_R_WDinOFc6fKe1Gdn8nJQgVSKAJEUyN_cQ_sjEOm71i6OTi2ovtTSoy5jrbUrgiwGX4Qr3pxgfWnQ-g_jAwJFAk0g9DyaoJjayPzecVkR3FNfgXuIPJjTi7eKlIoJxcrCSVZEYEj4W-7Ajj6g51rqov9cCw4rbNDlPRoLWxD6wGKYlcpjo9CObD-5iXzIZL8BBZ8sppR25B8WulGcMwGHOOm-44hKsB0V',
  },
  {
    name: 'Browser DevTools Timeline',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8Qm1ix3tS4tdq10WTh11B-DawYGDTQtNNGwSZozh81jSKGXXYMsEV-GXwyGBK_soE8uscZfbRx_z0upkEqhpQB2FqopZti1VN0gtvWDgIsppxMDin1stb-p6tKOxicWYyqw6ii0Sz4-0wIK7qeJymm_A5zTSm1PTU-xzeuL2vxGi1ko9_8Tuit4BL5TCZCl8uJn2AcHXwIdDFSFaeGb1JJFoajYm9R73KY6VseHdQeRecwgdVfbNj',
  },
  {
    name: 'CSS Box Model Visualizer',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo0z2kuiLa-3lplvi-_0_b9T7glyu-Ns6vENsUTHx3WJFC8a-SAqGUkD_9oS3nEe5tzQj2OsGKryRTN9xQg9zOrY3Fl9NtdYuwPeYB9mGSPHCuhl9ZUceGvzCqPUcK7zY756WhYhfIt6o6jAd1s4yCyW1-_k8qmKAVVyQiYl_giPWcJ4ew8_zv9khCRX2O3Pmj8CJym4xEa5UVBrgw002OLTOQbV0nKimRDnEzutmkxyCY_t_NPZu5',
  },
];

export const PostEditorModal = ({
  isOpen,
  onClose,
  onSave,
  initialArticle,
}) => {
  const [title, setTitle] = useState(initialArticle?.title || '');
  const [subtitle, setSubtitle] = useState(
    initialArticle?.subtitle || initialArticle?.excerpt || ''
  );
  const [category, setCategory] = useState(initialArticle?.category || 'React');
  const [subCategory, setSubCategory] = useState(
    initialArticle?.subCategory || 'Architecture & RSC'
  );
  const [readTime, setReadTime] = useState(
    initialArticle?.readTime || '8 min read'
  );
  const [authorName, setAuthorName] = useState(
    initialArticle?.author?.name || 'Alex Rivera'
  );
  const [authorRole, setAuthorRole] = useState(
    initialArticle?.author?.role || 'Lead Architect'
  );
  const [coverImage, setCoverImage] = useState(
    initialArticle?.coverImage || PRESET_COVERS[0].url
  );
  const [codePath, setCodePath] = useState(
    initialArticle?.codeSnippet?.path || 'src/lib/runtime-eval.ts'
  );
  const [codeSnippet, setCodeSnippet] = useState(
    initialArticle?.codeSnippet?.code ||
      `// High-performance typed dispatch algorithm
export async function streamTaskPipeline(workload) {
  const channel = new MessageChannel();
  return new Promise((resolve) => {
    channel.port1.onmessage = (event) => resolve(event.data);
    channel.port2.postMessage({ batch: workload, timestamp: performance.now() });
  });
}`
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: initialArticle?.id,
      title,
      subtitle,
      excerpt: subtitle,
      category,
      subCategory,
      readTime,
      coverImage,
      author: {
        name: authorName,
        role: authorRole,
        avatar:
          initialArticle?.author?.avatar ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRxokzOlYjiyCrI_0AfI2-tafDoH_vN0ozoPMom2466KKFzfm2tvQMtJ7BB2_P-ZjduDvD-FClr4jS_JyLLwlKqfdokZzf1Gg0EsE0c9ehGemnJ5bDG33VJQShgNIhGKVQxxR787vu0gfyiW3dyVAoCwjaaYUqBTBxma2df-kbnW_RZ9P1hEiqE0fOTypnLTkRgLoC6wCqnzYDO2DkqPNmr7OSxZaAKC-DAEBxW_KR8Wjso3c0dw7',
        bio: initialArticle?.author?.bio || 'Systems architect and open-source contributor.',
        github: initialArticle?.author?.github || 'github/author',
        twitter: initialArticle?.author?.twitter || '@author',
      },
      codeSnippet: {
        path: codePath,
        language: 'TSX',
        code: codeSnippet,
      },
    });

    onClose();
  };

  return (
    <div className="editor-modal-overlay">
      <div className="editor-modal-dialog">
        {/* Header */}
        <div className="editor-modal-header">
          <div className="editor-header-title">
            <MdEditSquare style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }} />
            <span>{initialArticle ? 'Edit Technical Article' : 'Draft Studio — New Article'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="icon-btn"
            style={{ width: '32px', height: '32px' }}
          >
            <MdClose style={{ fontSize: '1.25rem' }} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="editor-form-body">
          {/* Title */}
          <div>
            <label className="input-label">Article Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus in Modern Edge Workers"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-input-field"
              style={{ paddingLeft: '1rem', fontWeight: 600, fontSize: '1rem' }}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="input-label">Subtitle &amp; Abstract</label>
            <textarea
              rows={2}
              required
              placeholder="A concise summary of the architectural mechanics, tradeoffs, and benchmarks explored..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="text-input-field"
              style={{ paddingLeft: '1rem', height: 'auto', resize: 'vertical' }}
            />
          </div>

          {/* Category, SubCategory, Read Time */}
          <div className="editor-grid-three-col">
            <div>
              <label className="input-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-dropdown-field"
                style={{ paddingLeft: '1rem' }}
              >
                <option value="React">React</option>
                <option value="TypeScript">TypeScript</option>
                <option value="CSS">CSS</option>
                <option value="Next.js">Next.js</option>
                <option value="Performance">Performance</option>
                <option value="Career">Career</option>
                <option value="Cloud Architecture">Cloud Architecture</option>
                <option value="AI Tooling">AI Tooling</option>
              </select>
            </div>

            <div>
              <label className="input-label">Tag / Sub-domain</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Signals vs VDOM"
                className="text-input-field"
                style={{ paddingLeft: '1rem' }}
              />
            </div>

            <div>
              <label className="input-label">Estimated Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 7 min read"
                className="text-input-field"
                style={{ paddingLeft: '1rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              />
            </div>
          </div>

          {/* Presets */}
          <div>
            <label className="input-label">Cover Architecture Graphic</label>
            <div className="preset-covers-grid">
              {PRESET_COVERS.map((preset) => (
                <button
                  type="button"
                  key={preset.url}
                  onClick={() => setCoverImage(preset.url)}
                  className={`preset-cover-card ${coverImage === preset.url ? 'selected' : ''}`}
                >
                  <img src={preset.url} alt={preset.name} className="preset-cover-img" />
                  <span className="preset-cover-label">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reference Code Snippet */}
          <div>
            <div className="editor-code-header">
              <label className="input-label" style={{ marginBottom: 0 }}>Reference Code Snippet</label>
              <input
                type="text"
                value={codePath}
                onChange={(e) => setCodePath(e.target.value)}
                placeholder="File path: app/api/worker.ts"
                className="editor-code-path-input"
              />
            </div>
            <textarea
              rows={5}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="editor-code-textarea"
            />
          </div>

          {/* Author Details */}
          <div className="editor-grid-two-col">
            <div>
              <label className="input-label">Author Byline</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="text-input-field"
                style={{ paddingLeft: '1rem' }}
              />
            </div>
            <div>
              <label className="input-label">Author Title / Affiliation</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="text-input-field"
                style={{ paddingLeft: '1rem' }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="editor-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-guidelines-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-start-writing"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <MdPublish style={{ fontSize: '1.125rem' }} />
              <span>{initialArticle ? 'Save Changes' : 'Publish to Feed'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
