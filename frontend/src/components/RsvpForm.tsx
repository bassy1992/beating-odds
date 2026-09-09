import React, { useState } from 'react';
import { Attendee, AttendanceStatus, EventDetails } from '../types';
import { getGoogleCalendarUrl, downloadIcsFile, getWhatsAppShareUrl } from '../utils/calendar';
import { registerAttendee } from '../utils/api';
import {
  User,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  Calendar,
  Download,
  Share2,
  QrCode,
  Heart,
  MessageSquare,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface RsvpFormProps {
  event: EventDetails;
  onAttendeeRegistered: (attendee: Attendee) => void;
}

const COUNTRY_CODES = [
  { code: '+233', label: 'Ghana (+233)' },
  { code: '+234', label: 'Nigeria (+234)' },
  { code: '+1', label: 'US / Canada (+1)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+27', label: 'South Africa (+27)' },
  { code: '+254', label: 'Kenya (+254)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+971', label: 'UAE (+971)' },
];

export const RsvpForm: React.FC<RsvpFormProps> = ({ event, onAttendeeRegistered }) => {
  const [fullName, setFullName] = useState('');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+233');
  const [phoneLocalNumber, setPhoneLocalNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<AttendanceStatus>('attending');
  const [guestCount, setGuestCount] = useState<number>(0);
  const [attendeeType, setAttendeeType] = useState('Invited Guest');
  const [dietaryRequirements, setDietaryRequirements] = useState('No');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredAttendee, setRegisteredAttendee] = useState<Attendee | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = phoneLocalNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 6) {
      newErrors.phone = 'Please enter a valid telephone or WhatsApp number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const fullTelephone = `${phoneCountryCode} ${phoneLocalNumber.trim()}`;

    try {
      const newAttendee = await registerAttendee({
        fullName: fullName.trim(),
        telephone: fullTelephone,
        email: email.trim().toLowerCase(),
        status: status === 'attending' && guestCount > 0 ? 'with_guests' : status,
        guestCount: status === 'attending' ? guestCount : 0,
        notes: [dietaryNotes.trim(), additionalNotes.trim()].filter(Boolean).join('\n'),
        attendeeType,
        dietaryRequirements,
      });

      onAttendeeRegistered(newAttendee);
      setRegisteredAttendee(newAttendee);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Unable to save your RSVP.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormForAnother = () => {
    setRegisteredAttendee(null);
    setFullName('');
    setPhoneLocalNumber('');
    setEmail('');
    setStatus('attending');
    setGuestCount(0);
    setAttendeeType('Invited Guest');
    setDietaryRequirements('No');
    setDietaryNotes('');
    setAdditionalNotes('');
    setErrors({});
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="py-12 sm:py-16 bg-white" id="rsvp-form">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Attendance Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Will You Join Us?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Kindly confirm your attendance for the Beating Odds Foundation launch.
          </p>
        </div>

        {/* Confirmation Screen / Digital Pass */}
        {registeredAttendee ? (
          <div className="bg-gradient-to-b from-rose-50/50 to-white rounded-2xl border-2 border-rose-200 p-6 sm:p-8 shadow-md">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-3 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                RSVP Successfully Confirmed!
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Thank you, <span className="font-semibold text-slate-900">{registeredAttendee.fullName}</span>. We have saved your reservation for Saving Little Hearts.
              </p>
            </div>

            {/* Official Digital Pass Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                    Official Event Pass
                  </span>
                  <p className="text-xl font-extrabold text-slate-900 font-heading">
                    {registeredAttendee.fullName}
                  </p>
                  <p className="text-xs text-slate-500">
                    Badge ID: <span className="font-mono font-bold text-slate-800">{registeredAttendee.id}</span>
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-100">
                  <QrCode className="w-5 h-5 text-rose-600" />
                  <span className="text-xs font-semibold text-rose-900 uppercase">
                    {registeredAttendee.status === 'virtual' ? 'Virtual Attendee' : 'In-Person Attendee'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 mb-4">
                <div>
                  <span className="font-semibold text-slate-900 block">Telephone / WhatsApp:</span>
                  {registeredAttendee.telephone}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Email Address:</span>
                  {registeredAttendee.email}
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Date & Time:</span>
                  {event.dateString} • {event.timeString}
                </div>
                {registeredAttendee.guestCount > 0 && (
                  <div className="sm:col-span-2 text-rose-700 font-medium">
                    + Bringing {registeredAttendee.guestCount} additional companion(s)
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span>Show this badge or mention your name at the registration desk.</span>
                <span className="font-mono">{new Date(registeredAttendee.registeredAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Quick Actions (Add to Calendar, WhatsApp share, etc.) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
              >
                <Calendar className="w-4 h-4 text-rose-600" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={() => downloadIcsFile(event)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download .ICS Calendar Event</span>
              </button>

              <a
                href={getWhatsAppShareUrl(window.location.href, event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-2xs"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Invite via WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Invitation Link'}</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={resetFormForAnother}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
              >
                Register Another Colleague or Guest →
              </button>
            </div>
          </div>
        ) : (
          /* The Main Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm transition-all"
            noValidate
          >
            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g., Kofi Mensah or Sarah Ofori"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-rose-400 ring-2 ring-rose-100'
                        : 'border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Telephone & WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Telephone / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={phoneCountryCode}
                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                    className="w-32 sm:w-40 px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all shrink-0"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phoneLocalNumber}
                      onChange={(e) => {
                        setPhoneLocalNumber(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g., 024 123 4567"
                      className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                        errors.phone
                          ? 'border-rose-400 ring-2 ring-rose-100'
                          : 'border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
                      }`}
                    />
                  </div>
                </div>
                {errors.phone ? (
                  <p className="flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    We will send attendance updates and event reminders to this number.
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-rose-400 ring-2 ring-rose-100'
                        : 'border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1 text-xs text-rose-600 mt-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Attendance Options */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Will you be attending the Beating Odds Foundation Launch? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStatus('attending')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      status === 'attending'
                        ? 'border-rose-600 bg-rose-50/70 text-slate-900 shadow-2xs ring-1 ring-rose-600'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Yes, I will be there.</span>
                      {status === 'attending' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      We look forward to welcoming you.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('declined')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      status === 'declined'
                        ? 'border-rose-600 bg-rose-50/70 text-slate-900 shadow-2xs ring-1 ring-rose-600'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Unfortunately, I won&apos;t be able to attend.</span>
                      {status === 'declined' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Thank you for letting us know.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('virtual')}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      status === 'virtual'
                        ? 'border-rose-600 bg-rose-50/70 text-slate-900 shadow-2xs ring-1 ring-rose-600'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">I&apos;m not sure yet.</span>
                      {status === 'virtual' && <CheckCircle2 className="w-4 h-4 text-rose-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      We will be glad to hear from you when you decide.
                    </p>
                  </button>
                </div>
              </div>

              {/* Party Size */}
              {status === 'attending' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    How many people will be attending in your party?
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num - 1)}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                          guestCount === num - 1
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Total people in your party: <strong>{guestCount + 1}</strong>
                  </p>
                </div>
              )}

              {/* Attendee Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  I am attending as:
                </label>
                <select
                  value={attendeeType}
                  onChange={(e) => setAttendeeType(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all"
                >
                  <option>Invited Guest</option>
                  <option>Corporate / Business Representative</option>
                  <option>Sponsor / Partner</option>
                  <option>Media</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Dietary Requirements */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Do you have any dietary requirements or allergies we should be aware of?
                </label>
                <div className="flex gap-2">
                  {['No', 'Yes'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDietaryRequirements(option)}
                      className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        dietaryRequirements === option ? 'border-rose-600 bg-rose-50 text-rose-700 ring-1 ring-rose-600' : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {dietaryRequirements === 'Yes' && (
                <textarea
                  rows={2}
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="Please specify your dietary requirements or allergies"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all resize-none"
                />
              )}

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Is there anything else you would like us to know? (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Optional response"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                {errors.submit && (
                  <p className="text-center text-sm text-rose-600 mb-3">{errors.submit}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl shadow-md shadow-rose-600/20 transition-all active:scale-98 disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Confirming Your RSVP...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Confirm Attendance Registration</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🔒 Your information is kept strictly private by Beating Odds Foundation for attendee planning only.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
