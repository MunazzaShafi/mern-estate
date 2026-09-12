import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/users/${listing.userRef}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setLandlord(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching landlord:', err);
        setError(true);
        setLoading(false);
      }
    };

    if (listing?.userRef) {
      fetchLandlord();
    }
  }, [listing?.userRef]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Pre-formatted mail URLs
  const emailSubject = encodeURIComponent(`Regarding ${listing.name}`);
  const emailBody = encodeURIComponent(message);

  const gmailWebComposeUrl = landlord?.email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${landlord.email}&su=${emailSubject}&body=${emailBody}`
    : '#';

  const defaultMailtoUrl = landlord?.email
    ? `mailto:${landlord.email}?subject=${emailSubject}&body=${emailBody}`
    : '#';

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-slate-500 animate-pulse">Loading contact details...</p>
      </div>
    );
  }

  if (error || !landlord) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
        Unable to load owner contact information.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-white border border-[#DED8CA] rounded-2xl p-5 shadow-sm mt-4">
      {/* Landlord Contact Info Header */}
      <div className="flex items-center gap-2 text-slate-700 text-sm">
        <FaEnvelope className="text-[#29483F] shrink-0" />
        <p>
          Contact <span className="font-semibold text-[#29483F]">{landlord.username}</span> for{' '}
          <span className="font-semibold">{listing.name}</span>
        </p>
      </div>

      {/* Message Textarea */}
      <textarea
        name="message"
        id="message"
        rows="3"
        value={message}
        onChange={handleMessageChange}
        placeholder="Write your message here (e.g., I'm interested in viewing this property)..."
        className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#29483F] resize-none"
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Primary Button: Opens Gmail directly in a new tab */}
        <a
          href={gmailWebComposeUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#29483F] text-white text-center py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#203A33] transition duration-150"
        >
          <FaPaperPlane size={13} />
          Send via Gmail Web
        </a>

        {/* Secondary Button: Default System Mail Client (Outlook, Apple Mail, etc.) */}
        <a
  href={`mailto:${landlord.email}?subject=${encodeURIComponent('Regarding ' + listing.name)}&body=${encodeURIComponent(message)}`}
  className="border border-[#29483F] text-[#29483F] text-center py-3 px-4 rounded-xl font-medium text-sm hover:bg-slate-50 transition duration-150"
>
  Use Default Mail App
</a>
      </div>
    </div>
  );
}