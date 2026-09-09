import React from 'react';
import { FoundationLogo } from './FoundationLogo';
import { Users, Share2 } from 'lucide-react';

interface NavbarProps {
  attendeeCount: number;
  onOpenOrganizer: () => void;
  onOpenShare: () => void;
  onScrollToRsvp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  attendeeCount,
  onOpenOrganizer,
  onOpenShare,
  onScrollToRsvp,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 min-h-[4.5rem] py-2 flex items-center justify-between gap-2 sm:gap-4">
        {/* Foundation Branding */}
        <a href="#top" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <FoundationLogo size="md" />
        </a>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#overview" className="hover:text-rose-600 transition-colors">
            Overview
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenShare}
            className="inline-flex items-center justify-center gap-1.5 px-2 sm:px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Share RSVP link with others"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Link</span>
          </button>

          <button
            type="button"
            onClick={onOpenOrganizer}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-xs font-semibold text-slate-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-lg transition-colors"
            title="View attendees list & export data"
          >
            <Users className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden sm:inline">Attendees</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold bg-rose-600 text-white rounded-full">
              {attendeeCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onScrollToRsvp}
            className="inline-flex items-center justify-center px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-lg shadow-sm shadow-rose-500/25 transition-all hover:shadow-md"
          >
            RSVP Now
          </button>
        </div>
      </div>
    </header>
  );
};
