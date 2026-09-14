import React, { useState } from 'react';
import { Attendee, AttendanceStatus, EventDetails } from '../types';
import { getGoogleCalendarUrl, downloadIcsFile, getWhatsAppShareUrl } from '../utils/calendar';
import { registerAttendee } from '../utils/api';
import {
  CheckCircle2, Calendar, Download, Share2,
  Heart, AlertCircle, Copy, Check, Loader,
} from 'lucide-react';

interface RsvpFormProps {
  event: EventDetails;
  onAttendeeRegistered?: (attendee: Attendee) => void;
}

const COUNTRY_CODES = [
  { code: '+233', label: 'Ghana (+233)' },
  { code: '+234', label: 'Nigeria (+234)' },
  { code: '+1',   label: 'US/CA (+1)' },
  { code: '+44',  label: 'UK (+44)' },
  { code: '+27',  label: 'SA (+27)' },
  { code: '+254', label: 'Kenya (+254)' },
  { code: '+49',  label: 'Germany (+49)' },
  { code: '+33',  label: 'France (+33)' },
  { code: '+971', label: 'UAE (+971)' },
];

export const RsvpForm: React.FC<RsvpFormProps> = ({ event, onAttendeeRegistered }) => {
  const [fullName, setFullName]                   = useState('');
  const [phoneCountryCode, setPhoneCountryCode]   = useState('+233');
  const [phoneLocalNumber, setPhoneLocalNumber]   = useState('');
  const [email, setEmail]                         = useState('');
  const [status, setStatus]                       = useState<AttendanceStatus>('attending');
  const [attendanceChoice, setAttendanceChoice]   = useState<AttendanceStatus | null>(null);
  const [errors, setErrors]                       = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting]           = useState(false);
  const [registeredAttendee, setRegisteredAttendee] = useState<Attendee | null>(null);
  const [copiedLink, setCopiedLink]               = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2)
      e.fullName = 'Please enter your full name (at least 2 characters).';
    const cleanPhone = phoneLocalNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 6)
      e.phone = 'Please enter a valid phone or WhatsApp number.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = 'Please provide a valid email address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const newAttendee = await registerAttendee({
        fullName: fullName.trim(),
        telephone: `${phoneCountryCode} ${phoneLocalNumber.trim()}`,
        email: email.trim().toLowerCase(),
        status,
      });
      onAttendeeRegistered?.(newAttendee);
      setRegisteredAttendee(newAttendee);
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Unable to save your RSVP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRegisteredAttendee(null);
    setFullName(''); setPhoneLocalNumber(''); setEmail('');
    setStatus('attending'); setAttendanceChoice('attending'); setErrors({});
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="rsvp-shell" id="rsvp-form">
      <div className="rsvp-inner">

        {/* Header */}
        <div className="rsvp-header">
          <div>
            <span className="rsvp-eyebrow">
              <Heart style={{ width: '0.7rem', height: '0.7rem', fill: 'currentColor' }} />
              Attendance Registration
            </span>
          </div>
          <h2 className="rsvp-title">Will You Join Us?</h2>
          <p className="rsvp-subtitle">
            Kindly confirm your attendance for the Beating Odds Foundation launch.<br />
            Your seat and badge will be reserved once you register.
          </p>
        </div>

        {/* Attend / Decline toggle */}
        {!registeredAttendee && (
          <div className="rsvp-toggle" role="radiogroup" aria-label="Attendance selection">
            <button
              type="button"
              role="radio"
              aria-checked={attendanceChoice === 'attending'}
              onClick={() => { setAttendanceChoice('attending'); setStatus('attending'); }}
              className={`rsvp-toggle-btn${attendanceChoice === 'attending' ? ' active' : ''}`}
            >
              <CheckCircle2 style={{ width: '0.85rem', height: '0.85rem' }} />
              I Will Attend
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={attendanceChoice === 'declined'}
              onClick={() => { setAttendanceChoice('declined'); setStatus('declined'); }}
              className={`rsvp-toggle-btn${attendanceChoice === 'declined' ? ' active' : ''}`}
            >
              <AlertCircle style={{ width: '0.85rem', height: '0.85rem' }} />
              Cannot Attend
            </button>
          </div>
        )}

        {/* ── CONFIRMED ── */}
        {registeredAttendee ? (
          <div className="confirm-card">
            <div className="confirm-badge">
              <CheckCircle2 style={{ width: '1.75rem', height: '1.75rem', color: '#fffdf9' }} />
            </div>
            <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--clr-gold)', marginBottom: '0.25rem' }}>
              Registration Confirmed
            </p>
            <h3 className="confirm-name">{registeredAttendee.fullName}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--clr-muted)', margin: '0.25rem 0 0' }}>
              {registeredAttendee.status === 'attending' ? 'In-Person Attendee' : 'Virtual Attendee'}
            </p>
            <div className="confirm-divider" />
            <div className="confirm-detail-row">
              <Calendar style={{ width: '0.85rem', height: '0.85rem', color: 'var(--clr-gold)' }} />
              <span>{event.dateString} · {event.timeString}</span>
            </div>
            <div className="confirm-detail-row">
              <Heart style={{ width: '0.85rem', height: '0.85rem', color: 'var(--clr-gold)', fill: 'var(--clr-gold)' }} />
              <span>Beating Odds Foundation — Saving Little Hearts</span>
            </div>

            <div className="confirm-actions">
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="confirm-action-btn"
              >
                <Calendar style={{ width: '0.8rem', height: '0.8rem' }} />
                Google Calendar
              </a>
              <button type="button" onClick={() => downloadIcsFile(event)} className="confirm-action-btn">
                <Download style={{ width: '0.8rem', height: '0.8rem' }} />
                Download .ics
              </button>
              <button type="button" onClick={handleCopyLink} className="confirm-action-btn">
                {copiedLink
                  ? <Check style={{ width: '0.8rem', height: '0.8rem', color: 'var(--clr-green)' }} />
                  : <Copy style={{ width: '0.8rem', height: '0.8rem' }} />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
              <a
                href={getWhatsAppShareUrl(window.location.href, event)}
                target="_blank"
                rel="noopener noreferrer"
                className="confirm-action-btn primary"
              >
                <Share2 style={{ width: '0.8rem', height: '0.8rem' }} />
                Share on WhatsApp
              </a>
            </div>

            <button
              type="button"
              onClick={resetForm}
              style={{
                marginTop: '1.5rem', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '0.72rem', color: 'var(--clr-muted)', textDecoration: 'underline',
              }}
            >
              Register another person
            </button>
          </div>

        ) : attendanceChoice === 'attending' ? (
          /* ── FORM ── */
          <div className="rsvp-card">
            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="field-group">
                <label className="field-label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Abena Mensah"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="field-input"
                  aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                />
                {errors.fullName && <p className="field-error" id="fullName-err">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="field-group">
                <label className="field-label" htmlFor="phoneLocal">Phone / WhatsApp</label>
                <div className="phone-row">
                  <select
                    value={phoneCountryCode}
                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                    className="phone-select"
                    aria-label="Country calling code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <input
                    id="phoneLocal"
                    type="tel"
                    autoComplete="tel"
                    placeholder="24 555 0192"
                    value={phoneLocalNumber}
                    onChange={(e) => setPhoneLocalNumber(e.target.value)}
                    className="field-input"
                    style={{ flex: 1 }}
                    aria-describedby={errors.phone ? 'phone-err' : undefined}
                  />
                </div>
                {errors.phone && <p className="field-error" id="phone-err">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="field-group">
                <label className="field-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field-input"
                  aria-describedby={errors.email ? 'email-err' : undefined}
                />
                {errors.email && <p className="field-error" id="email-err">{errors.email}</p>}
              </div>



              {/* Submit error */}
              {errors.submit && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1rem', borderRadius: '0.6rem',
                  background: '#fef3c7', border: '1px solid #fcd34d',
                  marginBottom: '1rem',
                }}>
                  <AlertCircle style={{ width: '0.9rem', height: '0.9rem', color: '#92400e', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.78rem', color: '#92400e', margin: 0 }}>{errors.submit}</p>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spin" style={{ display: 'inline-block', width: '0.9rem', height: '0.9rem', border: '2px solid rgba(255,253,249,0.4)', borderTopColor: '#fffdf9', borderRadius: '50%' }} />
                    Saving your RSVP…
                  </>
                ) : (
                  <>
                    Confirm My Attendance
                    <Heart style={{ width: '0.85rem', height: '0.85rem', fill: 'currentColor' }} />
                  </>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--clr-muted)', marginTop: '0.85rem' }}>
                Your details are kept private and used only for this event.
              </p>
            </form>
          </div>

        ) : attendanceChoice === 'declined' ? (
          /* ── DECLINED ── */
          <div className="decline-card">
            <div style={{
              width: '3.5rem', height: '3.5rem', borderRadius: '50%',
              background: 'var(--clr-parchment)', border: '1px solid var(--clr-sand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
            }}>
              <Heart style={{ width: '1.4rem', height: '1.4rem', color: 'var(--clr-gold)' }} />
            </div>
            <h3 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '1.35rem', fontWeight: 500, color: 'var(--clr-brown)', margin: '0 0 0.5rem',
            }}>
              Thank you for letting us know.
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--clr-muted)', lineHeight: 1.65, maxWidth: '28rem', margin: '0 auto 1.5rem' }}>
              We're sorry you won't be able to join us. You can still follow our journey and support the cause by sharing the event with others.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              <a
                href={getWhatsAppShareUrl(window.location.href, event)}
                target="_blank"
                rel="noopener noreferrer"
                className="confirm-action-btn primary"
              >
                <Share2 style={{ width: '0.8rem', height: '0.8rem' }} />
                Share with Friends
              </a>
              <button type="button" onClick={() => setAttendanceChoice(null)} className="confirm-action-btn">
                Change My Response
              </button>
            </div>
          </div>

        ) : null}
      </div>
    </section>
  );
};
