import React from 'react';

interface HeroProps {
  onScrollToRsvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToRsvp: _onScrollToRsvp }) => {
  return (
    <section className="artwork-hero" id="overview">
      <img
        src="/assets/hero.png"
        alt="Official launch invitation for Beating Odds Foundation on 14 November 2026"
      />
    </section>
  );
};
