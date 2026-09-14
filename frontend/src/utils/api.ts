import { Attendee } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? 'https://beating-odds-api-production.up.railway.app/api' : '/api');

export async function registerAttendee(attendee: Omit<Attendee, 'id' | 'registeredAt' | 'checkedIn'>): Promise<Attendee> {
  const response = await fetch(`${API_BASE_URL}/attendees/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attendee),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || 'Unable to save your RSVP.');
  }

  return response.json();
}
