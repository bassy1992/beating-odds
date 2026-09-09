import { EventDetails } from '../types';

/**
 * Generate Google Calendar direct URL
 */
export function getGoogleCalendarUrl(event: EventDetails): string {
  const startTime = '20261114T150000Z';
  const endTime = '20261114T170000Z';
  const title = encodeURIComponent(`${event.title} - ${event.organizationName}`);
  const details = encodeURIComponent(`${event.description}\n\nContact: ${event.contactPhone} | ${event.contactEmail}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}`;
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
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
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
      `Please let us know if you will be attending so your seat and badge can be reserved:\n` +
      `${pageUrl}`
  );
  return `https://api.whatsapp.com/send?text=${text}`;
}

