import { Attendee, EventDetails } from '../types';

/**
 * Generate Google Calendar direct URL
 */
export function getGoogleCalendarUrl(event: EventDetails): string {
  const startTime = '20261114T150000Z';
  const endTime = '20261114T170000Z';
  const title = encodeURIComponent(`${event.title} - ${event.organizationName}`);
  const details = encodeURIComponent(
    `${event.description}\n\nVenue: ${event.venueName}, ${event.venueAddress}, ${event.venueCityCountry}\nContact: ${event.contactPhone} | ${event.contactEmail}\nDress Code: ${event.dressCode}`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}, ${event.venueCityCountry}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
}

/**
 * Generate an .ics file data URL for Apple Calendar, Outlook, and mobile devices
 */
export function downloadIcsFile(event: EventDetails): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Beating Odds Foundation//Saving Little Hearts RSVP//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:saving-little-hearts-' + Date.now() + '@beatingoddsfoundation.org',
    'DTSTAMP:20260908T150000Z',
    'DTSTART:20261114T150000Z',
    'DTEND:20261114T170000Z',
    `SUMMARY:${event.title} - ${event.organizationName}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}\\n\\nVenue: ${event.venueName}\\nAddress: ${event.venueAddress}`,
    `LOCATION:${event.venueName}, ${event.venueAddress}, ${event.venueCityCountry}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Beating_Odds_Saving_Little_Hearts_RSVP.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate WhatsApp share link with invitation message
 */
export function getWhatsAppShareUrl(pageUrl: string, event: EventDetails): string {
  const text = encodeURIComponent(
    `❤️ You are invited to the *Saving Little Hearts* launch by the *${event.organizationName}*!\n\n` +
      `📅 Date: ${event.dateString}\n` +
      `⏰ Time: ${event.timeString}\n` +
      `📍 Venue: ${event.venueName}, ${event.venueAddress}, ${event.venueCityCountry}\n\n` +
      `Please let us know if you will be attending so your seat and badge can be reserved:\n` +
      `${pageUrl}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}

/**
 * Export attendees list to CSV spreadsheet
 */
export function exportAttendeesToCsv(attendees: Attendee[]): void {
  const headers = ['RSVP ID', 'Full Name', 'Telephone', 'Email', 'Attendance Status', 'Extra Guests', 'Checked In', 'Registered Date', 'Notes'];

  const rows = attendees.map((a) => [
    `"${a.id}"`,
    `"${a.fullName.replace(/"/g, '""')}"`,
    `"${a.telephone.replace(/"/g, '""')}"`,
    `"${a.email.replace(/"/g, '""')}"`,
    `"${a.status}"`,
    a.guestCount || 0,
    a.checkedIn ? 'Yes' : 'No',
    `"${new Date(a.registeredAt).toLocaleString()}"`,
    `"${(a.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Beating_Odds_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
