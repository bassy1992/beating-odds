import React, { useState } from 'react';
import { Attendee } from '../types';
import { exportAttendeesToCsv } from '../utils/calendar';
import {
  X,
  Download,
  Search,
  Users,
  UserCheck,
  Phone,
  Mail,
  Trash2,
  Plus,
  Share2,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';

interface OrganizerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: Attendee[];
  onToggleCheckIn: (id: string) => void;
  onDeleteAttendee: (id: string) => void;
  onAddAttendee: (attendee: Omit<Attendee, 'id' | 'registeredAt'>) => void;
}

export const OrganizerPortalModal: React.FC<OrganizerPortalModalProps> = ({
  isOpen,
  onClose,
  attendees,
  onToggleCheckIn,
  onDeleteAttendee,
  onAddAttendee,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Manual entry form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGuests, setNewGuests] = useState(0);

  if (!isOpen) return null;

  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.telephone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'all') return true;
    if (filterStatus === 'in_person') return a.status === 'attending' || a.status === 'with_guests';
    if (filterStatus === 'virtual') return a.status === 'virtual';
    if (filterStatus === 'checked_in') return !!a.checkedIn;
    return true;
  });

  // Calculate statistics
  const totalRsvps = attendees.length;
  const inPersonCount = attendees.filter((a) => a.status === 'attending' || a.status === 'with_guests').length;
  const totalGuests = attendees.reduce((acc, a) => acc + (a.guestCount || 0), 0);
  const totalHeadcount = inPersonCount + totalGuests;
  const checkedInCount = attendees.filter((a) => a.checkedIn).length;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    onAddAttendee({
      fullName: newName.trim(),
      telephone: newPhone.trim(),
      email: newEmail.trim().toLowerCase() || 'unspecified@attendee.org',
      status: newGuests > 0 ? 'with_guests' : 'attending',
      guestCount: newGuests,
      notes: 'Added manually by organizer',
      checkedIn: false,
    });

    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewGuests(0);
    setShowAddForm(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-5xl my-auto max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                Organizer Attendance Portal
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live RSVP list for the Beating Odds Foundation launch
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Copy link to send to attendees"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share Link'}</span>
            </button>

            <button
              type="button"
              onClick={() => exportAttendeesToCsv(attendees)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xs transition-colors"
              title="Download spreadsheet of all RSVPs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50/40 border-b border-slate-200">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total RSVPs</span>
            <p className="text-2xl font-extrabold text-slate-900 font-heading mt-0.5">{totalRsvps}</p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">In-Person Seats</span>
            <p className="text-2xl font-extrabold text-rose-700 font-heading mt-0.5">{totalHeadcount}</p>
            <span className="text-[10px] text-slate-500">Includes {totalGuests} guests</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Checked In</span>
            <p className="text-2xl font-extrabold text-emerald-700 font-heading mt-0.5">
              {checkedInCount} <span className="text-xs font-normal text-slate-500">/ {totalRsvps}</span>
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Action</span>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">Walk-In Guest?</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
              title="Add Attendee Manually"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Manual Add Form (Toggled) */}
        {showAddForm && (
          <form
            onSubmit={handleManualSubmit}
            className="p-4 bg-rose-50/60 border-b border-rose-200 flex flex-wrap items-center gap-3"
          >
            <input
              type="text"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Attendee Full Name *"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 flex-1 min-w-[160px]"
            />
            <input
              type="tel"
              required
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Telephone / WhatsApp *"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 flex-1 min-w-[140px]"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email Address (optional)"
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500 flex-1 min-w-[160px]"
            />
            <select
              value={newGuests}
              onChange={(e) => setNewGuests(Number(e.target.value))}
              className="px-2 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-rose-500"
            >
              <option value={0}>Solo (0 Guests)</option>
              <option value={1}>+1 Guest</option>
              <option value={2}>+2 Guests</option>
              <option value={3}>+3 Guests</option>
            </select>
            <button
              type="submit"
              className="px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition-colors"
            >
              Save Attendee
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-2.5 py-2 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, email, or badge ID..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white text-slate-900 focus:outline-none focus:border-rose-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: 'all', label: 'All Attendees' },
              { id: 'in_person', label: 'In-Person' },
              { id: 'virtual', label: 'Virtual' },
              { id: 'checked_in', label: 'Checked In' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  filterStatus === tab.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attendees Table */}
        <div className="flex-1 overflow-y-auto min-h-[250px]">
          {filteredAttendees.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No attendees match your filter.</p>
              <p className="text-xs text-slate-400 mt-1">Try another search term or share the RSVP link.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider sticky top-0 border-b border-slate-200 z-10">
                <tr>
                  <th className="py-3 px-4">Attendee Name</th>
                  <th className="py-3 px-4">Telephone / WhatsApp</th>
                  <th className="py-3 px-4 hidden md:table-cell">Email</th>
                  <th className="py-3 px-4">Status & Guests</th>
                  <th className="py-3 px-4 text-center">Door Check-In</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAttendees.map((attendee) => {
                  const cleanPhoneForWa = attendee.telephone.replace(/[^0-9]/g, '');

                  return (
                    <tr
                      key={attendee.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        attendee.checkedIn ? 'bg-emerald-50/30' : ''
                      }`}
                    >
                      {/* Name & ID */}
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{attendee.fullName}</p>
                        <span className="font-mono text-[10px] text-slate-400">{attendee.id}</span>
                        {attendee.notes && (
                          <p className="text-[11px] text-slate-500 italic truncate max-w-xs mt-0.5">
                            "{attendee.notes}"
                          </p>
                        )}
                      </td>

                      {/* Phone & Direct WhatsApp link */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium text-slate-800">{attendee.telephone}</span>
                          {cleanPhoneForWa && (
                            <a
                              href={`https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(
                                `Hello ${attendee.fullName}, Beating Odds Foundation confirms your RSVP for Saving Little Hearts on Saturday, Nov 14. We look forward to welcoming you!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50"
                              title="Message via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <a
                          href={`mailto:${attendee.email}`}
                          className="text-slate-600 hover:text-rose-600 underline-offset-2 hover:underline truncate max-w-xs block"
                        >
                          {attendee.email}
                        </a>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {attendee.status === 'virtual' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            Virtual Livestream
                          </span>
                        ) : attendee.guestCount > 0 ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            In-Person (+{attendee.guestCount} guests)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            In-Person (Solo)
                          </span>
                        )}
                      </td>

                      {/* Check-In Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleCheckIn(attendee.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            attendee.checkedIn
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{attendee.checkedIn ? 'Checked In' : 'Pending'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Remove ${attendee.fullName} from attendee list?`)) {
                              onDeleteAttendee(attendee.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete attendee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing {filteredAttendees.length} of {attendees.length} total attendees registered
          </span>
          <div className="flex items-center gap-3">
            <span>Data stored locally and instantly exportable</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
