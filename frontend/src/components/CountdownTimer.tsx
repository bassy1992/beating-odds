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

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto" id="countdown-timer">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 font-sans">
          Countdown to the Saving Little Hearts Launch
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-rose-100 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <span className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
