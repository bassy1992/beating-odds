import React, { useState, useEffect } from 'react';
import { EVENT_DETAILS } from './data/eventData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RsvpForm } from './components/RsvpForm';
import { ShareModal } from './components/ShareModal';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isShareOpen, setIsShareOpen]   = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToRsvp = () => {
    document.getElementById('rsvp-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="top">
      <Navbar onOpenShare={() => setIsShareOpen(true)} onScrollToRsvp={scrollToRsvp} />

      <main>
        <Hero onScrollToRsvp={scrollToRsvp} />
        <RsvpForm event={EVENT_DETAILS} />
      </main>

      {/* Share modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        event={EVENT_DETAILS}
      />

      {/* Scroll-to-top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-btn"
          title="Back to top"
          aria-label="Scroll back to top"
        >
          <ArrowUp style={{ width: '0.9rem', height: '0.9rem' }} />
        </button>
      )}
    </div>
  );
}
