import React from 'react';
import { FoundationLogo } from './FoundationLogo';
import { Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenShare: () => void;
  onScrollToRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShare,
  onScrollToRsvp,
}) => {
  return (
    <header className="invitation-header sticky top-0 z-40 w-full transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 min-h-[4.5rem] py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Foundation Branding */}
        <a href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <FoundationLogo size="sm" className="brand-mark" />
        </a>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
          <a href="#overview" className="hover:text-stone-900 transition-colors">
            Invitation
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 transition-colors"
            title="Share RSVP link with others"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Link</span>
          </button>

          <button
            type="button"
            onClick={onScrollToRsvp}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#3f5148] hover:bg-[#33443b] rounded-full transition-colors"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </header>
  );
};
