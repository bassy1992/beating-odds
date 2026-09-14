import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = +new Date(targetDate) - +new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: 'Days',    value: timeLeft.days },
    { label: 'Hours',   value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="countdown-shell">
      <div className="countdown-inner">
        <p className="countdown-label">
          <span className="pulse-dot" style={{
            display: 'inline-block', width: '0.4rem', height: '0.4rem',
            borderRadius: '50%', background: '#d4a96a',
          }} />
          Event Countdown
        </p>
        <p className="countdown-title">
          Saving Little Hearts — November 14, 2026
        </p>
        <div className="countdown-grid">
          {units.map((u) => (
            <div key={u.label} className="countdown-unit">
              <span className="countdown-unit-num">
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="countdown-unit-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
