import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/users/${listing.userRef}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (listing.userRef) {
      fetchLandlord();
    }
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-3 mt-4'>
          <p className='text-sm text-slate-600'>
            Contact <span className='font-semibold text-slate-800'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold text-slate-800'>{listing.name}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='3'
            value={message}
            onChange={onChange}
            placeholder='Write your message here...'
            className='w-full border border-slate-300 p-3 rounded-lg outline-none focus:border-[#29483F]'
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${encodeURIComponent(message)}`}
            className='bg-[#29483F] text-white text-center p-3 uppercase rounded-lg font-medium hover:bg-[#203A33] transition shadow-sm'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;