import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from './data/eventData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RsvpForm } from './components/RsvpForm';
import { ShareModal } from './components/ShareModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRsvp = () => {
    const elem = document.getElementById('rsvp-form');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900 pb-20 md:pb-0" id="top">
      {/* Top Navbar */}
      <Navbar
        onOpenShare={() => setIsShareOpen(true)}
        onScrollToRsvp={scrollToRsvp}
      />

      <main className="flex-1">
        {/* Hero with Brand & Live Countdown */}
        <Hero
          onScrollToRsvp={scrollToRsvp}
        />

        {/* Primary RSVP Registration Section */}
        <RsvpForm
          event={EVENT_DETAILS}
        />

      </main>

      {/* Share Link Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        event={EVENT_DETAILS}
      />

      {/* Scroll to Top Floating Button (Desktop) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-30 p-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md transition-all hover:scale-105"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
