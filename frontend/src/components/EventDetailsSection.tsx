import React from 'react';
import { EventDetails } from '../types';
import {
  MapPin,
  Clock,
  Car,
  Shirt,
  ShieldCheck,
  ExternalLink,
  Navigation,
  Sparkles,
  Heart,
} from 'lucide-react';

interface EventDetailsSectionProps {
  event: EventDetails;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ event }) => {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.venueName} ${event.venueAddress} ${event.venueCityCountry}`
  )}`;

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200/80" id="location">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            <span>Launch Details</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            The Launch
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Join us as we begin a movement committed to creating hope, extending support, and helping little hearts beat a little stronger.
          </p>
        </div>

        {/* Main Grid: Location Card & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Venue Details Card & Map Mockup */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Official Launch Venue
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
                  {event.venueName}
                </h3>
                <p className="text-slate-600 text-sm mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{event.venueAddress}, {event.venueCityCountry}</span>
                </p>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Stylized Interactive Map Preview */}
            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mb-6 group">
              {/* Map background illustration with roads and river/park accents */}
              <div className="absolute inset-0 bg-[#e5e3df] overflow-hidden">
                {/* SVG map roads & landmarks */}
                <svg className="w-full h-full opacity-70" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
                  <rect width="600" height="300" fill="#f8f4f0" />
                  {/* Green Park zones */}
                  <path d="M0,0 L180,0 L140,90 L0,60 Z" fill="#d8e8d8" />
                  <path d="M420,180 Q520,150 600,200 L600,300 L380,300 Z" fill="#d8e8d8" />
                  {/* Major Avenues / Roads */}
                  <path d="M-20,150 Q200,120 620,160" stroke="#ffffff" strokeWidth="24" fill="none" />
                  <path d="M-20,150 Q200,120 620,160" stroke="#fcd34d" strokeWidth="4" strokeDasharray="8,6" fill="none" />
                  
                  <path d="M280,-10 L310,310" stroke="#ffffff" strokeWidth="20" fill="none" />
                  <path d="M120,-10 L160,310" stroke="#ffffff" strokeWidth="12" fill="none" />
                  <path d="M460,-10 L440,310" stroke="#ffffff" strokeWidth="12" fill="none" />

                  {/* Secondary Streets */}
                  <path d="M0,80 L600,110" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                  <path d="M0,230 L600,210" stroke="#e2e8f0" strokeWidth="8" fill="none" />
                </svg>
              </div>

              {/* Pin Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative -translate-y-4 flex flex-col items-center">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 mb-1.5">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{event.venueName}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white animate-bounce">
                    <MapPin className="w-5 h-5 fill-white" />
                  </div>
                  <div className="w-4 h-1.5 bg-slate-900/30 rounded-full blur-[1px]" />
                </div>
              </div>

              {/* Map Floating Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200 shadow-sm text-xs">
                <div>
                  <p className="font-bold text-slate-800">Ebenezer Methodist Church</p>
                  <p className="text-slate-500">Youth Auditorium, Community 20, Tema</p>
                </div>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors inline-flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>We look forward to welcoming you.</span>
              <span className="font-semibold text-slate-700">Questions? Call {event.contactPhone}</span>
            </div>
          </div>

          {/* Right Column: Key Logistics Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Arrival & Schedule Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Timing & Check-In</h4>
                  <p className="text-xs font-semibold text-rose-700 mt-0.5">
                    The launch begins at 3:00 PM
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Please arrive a little early for check-in and seating.
                  </p>
                </div>
              </div>
            </div>

            {/* Parking Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Parking & Transit</h4>
                  <p className="text-xs font-semibold text-blue-700 mt-0.5">
                    Arrival & Parking
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {event.parkingInfo}
                  </p>
                </div>
              </div>
            </div>

            {/* Dress Code Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Dress Code</h4>
                  <p className="text-xs font-semibold text-amber-800 mt-0.5">
                    Foundation T-shirt or Semi-Formal
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Dress in the foundation's official T-shirt or semi-formal attire.
                  </p>
                </div>
              </div>
            </div>

            {/* Health & Safety Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Why We Are Gathering</h4>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Hope, support, and advocacy
                  </p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Beating Odds Foundation exists to raise awareness, provide support, and improve access to care for children and families affected by Down Syndrome and congenital heart defects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
