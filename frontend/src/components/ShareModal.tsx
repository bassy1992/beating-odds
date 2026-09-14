import React, { useState } from 'react';
import { EventDetails } from '../types';
import { getWhatsAppShareUrl } from '../utils/calendar';
import { X, Copy, Check, Share2, Mail, MessageCircle } from 'lucide-react';

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

  const emailSubject = encodeURIComponent(
    `Invitation: Saving Little Hearts — ${event.organizationName}`
  );
  const emailBody = encodeURIComponent(
    `Hello,\n\nYou are cordially invited to the official launch of the ${event.organizationName}.\n\n` +
    `📅 Date: ${event.dateString}\n⏰ Time: ${event.timeString}\n\n` +
    `Please RSVP to reserve your badge and seat:\n${currentUrl}\n\n` +
    `Warm regards,\n${event.organizationName}`
  );

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '0.6rem' }}>
            <div className="modal-icon-wrap">
              <Share2 style={{ width: '0.95rem', height: '0.95rem' }} />
            </div>
            <h3 className="modal-title" id="share-modal-title">Share the Invitation</h3>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close share dialog"
          >
            <X style={{ width: '1rem', height: '1rem' }} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="modal-desc">
            Help spread the word — share this RSVP link with friends, family, colleagues, and community groups who should be part of this movement.
          </p>

          {/* Copy row */}
          <div className="modal-copy-row">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="modal-copy-input"
              aria-label="RSVP page URL"
            />
            <button type="button" onClick={handleCopy} className="modal-copy-btn">
              {copied
                ? <Check style={{ width: '0.75rem', height: '0.75rem', color: '#86efac' }} />
                : <Copy style={{ width: '0.75rem', height: '0.75rem' }} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* Share buttons */}
          <div className="modal-share-btns">
            <a
              href={getWhatsAppShareUrl(currentUrl, event)}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn share-btn-whatsapp"
            >
              <MessageCircle style={{ width: '1rem', height: '1rem' }} />
              Share via WhatsApp
            </a>
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="share-btn share-btn-email"
            >
              <Mail style={{ width: '1rem', height: '1rem' }} />
              Send Email Invitation
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          Beating Odds Foundation · Awareness · Action · Impact · Change
        </div>
      </div>
    </div>
  );
};
