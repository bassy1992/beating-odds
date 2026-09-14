import React from 'react';
import { Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenShare: () => void;
  onScrollToRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShare, onScrollToRsvp }) => {
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        {/* Logo */}
        <a href="#top" className="nav-logo">
          <img src="/assets/logo6.jpeg" alt="Beating Odds Foundation" />
          <div className="nav-logo-text">
            <strong>Beating Odds</strong>
            <span>Foundation</span>
          </div>
        </a>

        {/* Nav links – desktop */}
        <nav className="nav-links" style={{ display: 'none' }} aria-hidden="true">
          {/* hidden on mobile via CSS below */}
        </nav>
        <nav className="nav-links hidden-mobile">
          <a href="#overview">Event</a>
          <a href="#rsvp-form">RSVP</a>
          <a href="#foundation">About</a>
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button
            type="button"
            onClick={onOpenShare}
            className="nav-btn-ghost"
            title="Share RSVP link"
          >
            <Share2 style={{ width: '0.85rem', height: '0.85rem' }} />
            <span className="hide-xs">Share</span>
          </button>
          <button
            type="button"
            onClick={onScrollToRsvp}
            className="nav-btn-primary"
          >
            RSVP Now
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .hide-xs { display: none; }
        }
      `}</style>
    </header>
  );
};
