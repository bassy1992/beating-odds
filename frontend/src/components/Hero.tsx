import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { EVENT_DETAILS } from '../data/eventData';
import { Calendar, Sparkles, HeartHandshake, ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollToRsvp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToRsvp }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 bg-gradient-to-b from-rose-50/60 via-white to-slate-50 border-b border-slate-200/60" id="overview">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 w-72 h-72 bg-rose-200/50 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-red-100/60 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Foundation & Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 shadow-xs mb-6">
          <HeartHandshake className="w-4 h-4 text-rose-600" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-900 font-sans text-left sm:text-center">
            Beating Odds Foundation <span className="hidden sm:inline">•</span> Official Launch
          </span>
        </div>

        <h1 className="text-[clamp(2.5rem,14vw,4.5rem)] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 font-heading leading-none mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600">Saving Little Hearts</span>
        </h1>

        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-800 font-heading mb-4 leading-tight">
          Official Launch & Fundraising Event
        </p>

        {/* Mission Statement directly from flyer */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-sans mb-8">
          {EVENT_DETAILS.description}
        </p>

        {/* Live Countdown Section */}
        <div className="mb-10 p-5 sm:p-6 bg-gradient-to-b from-white to-rose-50/40 rounded-2xl sm:rounded-3xl border border-rose-100 shadow-sm max-w-2xl mx-auto">
          <CountdownTimer targetDate={EVENT_DETAILS.isoDate} />
        </div>

        {/* Event Quick Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 text-left">
          <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</p>
              <p className="text-sm font-semibold text-slate-900">{EVENT_DETAILS.dateString}</p>
              <p className="text-xs text-slate-600">{EVENT_DETAILS.timeString}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admission</p>
              <p className="text-sm font-semibold text-emerald-700">Free Admission</p>
              <p className="text-xs text-slate-600">RSVP requested</p>
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToRsvp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl shadow-md shadow-rose-600/25 transition-all hover:shadow-lg active:scale-98"
          >
            <span>Register Your Attendance</span>
            <ArrowDown className="w-4 h-4" />
          </button>

        </div>
      </div>
    </section>
  );
};
