import React, { useState, useEffect } from 'react';
import { Attendee } from './types';
import { EVENT_DETAILS } from './data/eventData';
import {
  getStoredAttendees,
  saveAttendees,
  addAttendee,
  deleteAttendee,
  toggleCheckIn,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RsvpForm } from './components/RsvpForm';
import { EventDetailsSection } from './components/EventDetailsSection';
import { Footer } from './components/Footer';
import { OrganizerPortalModal } from './components/OrganizerPortalModal';
import { ShareModal } from './components/ShareModal';
import { Users, Heart, ArrowUp } from 'lucide-react';

export default function App() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setAttendees(getStoredAttendees());

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAttendeeRegistered = (newAttendee: Attendee) => {
    const updated = [newAttendee, ...attendees.filter((a) => a.id !== newAttendee.id)];
    setAttendees(updated);
    saveAttendees(updated);
  };

  const handleToggleCheckIn = (id: string) => {
    const updated = toggleCheckIn(id);
    setAttendees(updated);
  };

  const handleDeleteAttendee = (id: string) => {
    const updated = deleteAttendee(id);
    setAttendees(updated);
  };

  const handleAddManualAttendee = (data: Omit<Attendee, 'id' | 'registeredAt'>) => {
    const created = addAttendee(data);
    setAttendees(getStoredAttendees());
  };

  const scrollToRsvp = () => {
    const elem = document.getElementById('rsvp-form');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToLocation = () => {
    const elem = document.getElementById('location');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900 pb-20 md:pb-0" id="top">
      {/* Top Navbar */}
      <Navbar
        attendeeCount={attendees.length}
        onOpenOrganizer={() => setIsOrganizerOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onScrollToRsvp={scrollToRsvp}
      />

      <main className="flex-1">
        {/* Hero with Brand & Live Countdown */}
        <Hero
          onScrollToRsvp={scrollToRsvp}
          onScrollToLocation={scrollToLocation}
        />

        {/* Primary RSVP Registration Section */}
        <RsvpForm
          event={EVENT_DETAILS}
          onAttendeeRegistered={handleAttendeeRegistered}
        />

        {/* Event Location, Venue Map & Logistics */}
        <EventDetailsSection event={EVENT_DETAILS} />

      </main>

      {/* Footer */}
      <Footer onOpenOrganizer={() => setIsOrganizerOpen(true)} />

      {/* Organizer Portal Modal */}
      <OrganizerPortalModal
        isOpen={isOrganizerOpen}
        onClose={() => setIsOrganizerOpen(false)}
        attendees={attendees}
        onToggleCheckIn={handleToggleCheckIn}
        onDeleteAttendee={handleDeleteAttendee}
        onAddAttendee={handleAddManualAttendee}
      />

      {/* Share Link Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        event={EVENT_DETAILS}
      />

      {/* Floating Bottom Quick RSVP / Organizer Bar on Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center justify-between gap-3 shadow-lg">
        <button
          type="button"
          onClick={() => setIsOrganizerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
        >
          <Users className="w-3.5 h-3.5 text-rose-600" />
          <span>{attendees.length} RSVPs</span>
        </button>

        <button
          type="button"
          onClick={scrollToRsvp}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 shadow-sm"
        >
          <Heart className="w-3.5 h-3.5 fill-white" />
          <span>Register Attendance</span>
        </button>
      </div>

      {/* Scroll to Top Floating Button (Desktop) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-30 p-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-md transition-all hover:scale-105"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
