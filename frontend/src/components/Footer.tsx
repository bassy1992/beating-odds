import React from 'react';
import { FoundationLogo } from './FoundationLogo';
import { EVENT_DETAILS } from '../data/eventData';
import { Phone, Mail, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenOrganizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrganizer }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-16 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <FoundationLogo size="md" />
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm mt-3">
              Beating Odds Foundation is dedicated to advocating for pediatric heart health, empowering vulnerable children, and mobilizing life-saving interventions for families facing congenital health crises.
            </p>
            <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-wider text-[11px] pt-1">
              <span>Awareness</span>
              <span>•</span>
              <span>Action</span>
              <span>•</span>
              <span>Impact</span>
              <span>•</span>
              <span>Change</span>
            </div>
          </div>

          {/* Event Quick Contacts */}
          <div className="md:col-span-4 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Programme Inquiries & Support
            </p>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{EVENT_DETAILS.contactPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <a href={`mailto:${EVENT_DETAILS.contactEmail}`} className="hover:text-rose-600 transition-colors">
                {EVENT_DETAILS.contactEmail}
              </a>
            </div>
          </div>

          {/* Socials & Organizer Portal Access */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Official Channels
            </p>
            <div className="space-y-1.5">
              <a
                href="https://www.instagram.com/beatingoddsfoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-rose-600 transition-colors"
              >
                <span>Instagram: @beatingoddsfoundation</span>
              </a>
              <a
                href="https://www.tiktok.com/@beatingoddsfoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-rose-600 transition-colors"
              >
                <span>TikTok: @beatingoddsfoundation</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenOrganizer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span>Organizer Attendance Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Beating Odds Foundation. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>for vulnerable children & their families.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
