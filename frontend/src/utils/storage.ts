import { Attendee } from '../types';
import { INITIAL_ATTENDEES } from '../data/eventData';

const STORAGE_KEY = 'beating_odds_attendees_v1';

export function getStoredAttendees(): Attendee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with sample attendees so the user has immediate data to explore
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ATTENDEES));
      return INITIAL_ATTENDEES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_ATTENDEES;
  } catch {
    return INITIAL_ATTENDEES;
  }
}

export function saveAttendees(attendees: Attendee[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendees));
  } catch (err) {
    console.error('Failed to persist attendees to localStorage', err);
  }
}

export function addAttendee(attendee: Omit<Attendee, 'id' | 'registeredAt'>): Attendee {
  const attendees = getStoredAttendees();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newAttendee: Attendee = {
    ...attendee,
    id: `BOF-${randomSuffix}`,
    registeredAt: new Date().toISOString(),
    checkedIn: false,
  };

  const updated = [newAttendee, ...attendees];
  saveAttendees(updated);
  return newAttendee;
}

export function deleteAttendee(id: string): Attendee[] {
  const current = getStoredAttendees();
  const updated = current.filter((item) => item.id !== id);
  saveAttendees(updated);
  return updated;
}

export function toggleCheckIn(id: string): Attendee[] {
  const current = getStoredAttendees();
  const updated = current.map((item) => {
    if (item.id === id) {
      return { ...item, checkedIn: !item.checkedIn };
    }
    return item;
  });
  saveAttendees(updated);
  return updated;
}
