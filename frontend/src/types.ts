export type AttendanceStatus = 'attending' | 'with_guests' | 'virtual' | 'declined';

export interface Attendee {
  id: string;
  fullName: string;
  telephone: string;
  email: string;
  status: AttendanceStatus;
  guestCount: number;
  notes?: string;
  attendeeType?: string;
  dietaryRequirements?: string;
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
  venueName: string;
  venueAddress: string;
  venueCityCountry: string;
  googleMapsQuery: string;
  contactEmail: string;
  contactPhone: string;
  instagramHandle: string;
  tiktokHandle: string;
  dressCode: string;
  parkingInfo: string;
}

