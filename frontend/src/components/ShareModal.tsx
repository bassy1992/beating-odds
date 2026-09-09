import React, { useState } from 'react';
import { EventDetails } from '../types';
import { getWhatsAppShareUrl } from '../utils/calendar';
import { X, Copy, Check, Share2, Mail, MessageCircle, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, event }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSubject = encodeURIComponent(`Invitation: Saving Little Hearts by ${event.organizationName}`);
  const emailBody = encodeURIComponent(
    `Hello,\n\nYou are cordially invited to ${event.title} organized by the ${event.organizationName}.\n\n` +
      `Date: ${event.dateString}\n` +
      `Time: ${event.timeString}\n` +
      `Please RSVP so the foundation can reserve your delegate badge and seating:\n` +
      `${currentUrl}\n\n` +
      `Best regards,\n${event.organizationName}`
  );
  const emailShareUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Share RSVP Link
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Send this link to friends, colleagues, partners, or community groups to gather their name, telephone, and email for attendance tracking.
        </p>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 mb-5">
          <input
            type="text"
            readOnly
            value={currentUrl}
            className="bg-transparent text-xs text-slate-700 flex-1 px-2 focus:outline-none truncate font-mono"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shrink-0"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Quick Social Shares */}
        <div className="space-y-2 mb-6">
          <a
            href={getWhatsAppShareUrl(currentUrl, event)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>

          <a
            href={emailShareUrl}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
          >
            <Mail className="w-4 h-4 text-slate-600" />
            <span>Send via Email Invitation</span>
          </a>
        </div>

        <div className="pt-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Beating Odds Foundation • AWARENESS • ACTION • IMPACT • CHANGE
          </p>
        </div>
      </div>
    </div>
  );
};
