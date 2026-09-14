import React from 'react';

interface HeroProps {
  onScrollToRsvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToRsvp: _onScrollToRsvp }) => {
  return (
    <section id="overview" style={{ lineHeight: 0, background: '#0b1612', textAlign: 'center' }}>
      <img
        src="/assets/hero.png"
        alt="Beating Odds Foundation – Saving Little Hearts launch event"
        loading="eager"
        fetchPriority="high"
        style={{
          display: 'inline-block',
          width: '100%',
          maxWidth: '600px',
          height: 'auto',
          verticalAlign: 'bottom',
        }}
      />
    </section>
  );
};
