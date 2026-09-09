export type AttendanceStatus = 'attending' | 'virtual' | 'declined';

export interface Attendee {
  id: string;
  fullName: string;
  telephone: string;
  email: string;
  status: AttendanceStatus;
  attendeeType?: string;
  registeredAt: string;
  checkedIn?: boolean;
}

export interface EventDetails {
  title: string;
  eventNumberHeadline: string;
  theme: string;
  tagline: string;
  description: string;
  organizationName: string;
  dateString: string;
  isoDate: string;
  timeString: string;
  contactEmail: string;
  contactPhone: string;
  instagramHandle: string;
  tiktokHandle: string;
}

