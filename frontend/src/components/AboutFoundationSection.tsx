import React from 'react';
import { Activity, ShieldAlert, Heart, Sparkles, ExternalLink } from 'lucide-react';

const pillars = [
  {
    key: 'awareness',
    name: 'Awareness',
    icon: <Activity style={{ width: '1.15rem', height: '1.15rem' }} />,
    iconBg: 'rgba(141,109,67,0.12)',
    iconColor: 'var(--clr-gold)',
    desc: 'Educating parents, schools, and health centres on warning signs of congenital and acquired childhood heart disease.',
  },
  {
    key: 'action',
    name: 'Action',
    icon: <ShieldAlert style={{ width: '1.15rem', height: '1.15rem' }} />,
    iconBg: 'rgba(63,81,72,0.1)',
    iconColor: 'var(--clr-green)',
    desc: 'Mobilising surgical funding, diagnostic echoes, and emergency medications for children whose families cannot afford care.',
  },
  {
    key: 'impact',
    name: 'Impact',
    icon: <Heart style={{ width: '1.15rem', height: '1.15rem' }} />,
    iconBg: 'rgba(220,38,38,0.08)',
    iconColor: '#dc2626',
    desc: 'Restoring healthy futures so every child can run, play, attend school, and thrive alongside their peers.',
  },
  {
    key: 'change',
    name: 'Change',
    icon: <Sparkles style={{ width: '1.15rem', height: '1.15rem' }} />,
    iconBg: 'rgba(37,99,235,0.08)',
    iconColor: '#2563eb',
    desc: 'Championing systemic healthcare policy and equipping regional medical centres with paediatric cardiology tools.',
  },
];

export const AboutFoundationSection: React.FC = () => {
  return (
    <section className="about-shell" id="foundation">
      <div className="about-inner">

        {/* Intro */}
        <div className="about-intro">
          <div className="about-intro-logo">
            <img src="/assets/logo6.jpeg" alt="Beating Odds Foundation" />
          </div>
          <div>
            <p className="about-eyebrow">About the Foundation</p>
            <h2 className="about-title">
              Giving Every Child<br />a Fighting Chance
            </h2>
            <p className="about-desc">
              Beating Odds Foundation was born from one family's journey and a deep desire to help
              more children born with Down Syndrome and congenital heart defects have a better chance
              at life. We believe no child should be denied life-saving care because of geography or
              poverty.
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div key={p.key} className="pillar-item">
              <div
                className="pillar-icon"
                style={{ background: p.iconBg, color: p.iconColor }}
              >
                {p.icon}
              </div>
              <p className="pillar-name">{p.name}</p>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Socials banner */}
        <div className="socials-banner">
          <div>
            <p className="socials-eyebrow">Join Our Community Movement</p>
            <h3 className="socials-title">@beatingoddsfoundation</h3>
            <p className="socials-sub">
              Survivor stories, paediatric cardiology education, and event countdown updates — on Instagram &amp; TikTok.
            </p>
          </div>
          <div className="socials-links">
            <a
              href="https://www.instagram.com/beatingoddsfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {/* Instagram icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
              <ExternalLink style={{ width: '0.65rem', height: '0.65rem', opacity: 0.5 }} />
            </a>
            <a
              href="https://www.tiktok.com/@beatingoddsfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              {/* TikTok icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.95a8.19 8.19 0 0 0 4.78 1.52V7.04a4.85 4.85 0 0 1-1.01-.35z" />
              </svg>
              TikTok
              <ExternalLink style={{ width: '0.65rem', height: '0.65rem', opacity: 0.5 }} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
