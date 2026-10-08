import React from 'react';
import {
  MdVerified,
  MdClose,
} from 'react-icons/md';
import './GuidelinesModal.css';

export const GuidelinesModal = ({
  isOpen,
  onClose,
  onStartWriting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="guidelines-modal-overlay">
      <div className="guidelines-modal-dialog">
        {/* Header */}
        <div className="guidelines-header">
          <div className="guidelines-title">
            <MdVerified style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }} />
            <span>DevBlog Editorial Standards &amp; Author Guidelines</span>
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

        {/* Content */}
        <div className="guidelines-content">
          <div className="guidelines-core-axiom">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-tertiary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Core Axiom
            </span>
            <p style={{ color: 'var(--color-on-surface)', fontWeight: 500 }}>
              We value deep technical precision over algorithmic hype. Every published article must help a software engineer, frontend architect, or systems designer understand observable runtime realities.
            </p>
          </div>

          <div>
            <h4 className="guidelines-pillar-heading">
              <span className="guidelines-heading-pill" style={{ backgroundColor: 'var(--color-primary)' }} />
              1. Reproducible Specifications
            </h4>
            <p>
              Code samples must not be pseudo-code cartoons. Where performance claims or microbenchmarks are made, include reproducible harness configurations, runtime targets, and hardware metrics.
            </p>
          </div>

          <div>
            <h4 className="guidelines-pillar-heading">
              <span className="guidelines-heading-pill" style={{ backgroundColor: 'var(--color-tertiary)' }} />
              2. Zero-Hype, High-Signal Tone
            </h4>
            <p>
              Avoid sensationalized titles, exaggerated claims, or generic regurgitations of marketing material. Dissect actual failure states, edge-case reconciliations, and architectural trade-offs.
            </p>
          </div>

          <div>
            <h4 className="guidelines-pillar-heading">
              <span className="guidelines-heading-pill" style={{ backgroundColor: 'var(--color-secondary)' }} />
              3. Author Grants &amp; Peer Review
            </h4>
            <p>
              Submissions undergo double-blind technical peer review by verified systems practitioners within 24–48 hours. Accepted deep dives are compensated via our Author Grant program ($400 - $800).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="guidelines-footer">
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--color-outline)' }}>
            Protocol Rev 2025.4
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-guidelines-outline"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartWriting();
              }}
              className="btn-start-writing"
            >
              Start Writing Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
