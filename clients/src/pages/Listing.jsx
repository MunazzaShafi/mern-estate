import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import Contact from '../Components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listings/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className='min-h-screen pb-12'>
      {loading && <p className='text-center my-10 text-2xl text-slate-700 font-medium'>Loading...</p>}
      {error && (
        <p className='text-center my-10 text-2xl text-red-600 font-medium'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          {/* Responsive Slider with Best-Fit Dimensions */}
          <div className='w-full max-w-6xl mx-auto mt-4 px-3'>
            <Swiper navigation className='rounded-2xl overflow-hidden shadow-md'>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] bg-slate-100'
                    style={{
                      background: `url(${url}) center / cover no-repeat`,
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Share Button */}
          <div className='fixed top-[13%] right-[3%] z-10 border border-slate-200 shadow rounded-full w-11 h-11 flex justify-center items-center bg-white cursor-pointer hover:bg-slate-50 transition'>
            <FaShare
              className='text-slate-600'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[20%] right-[5%] z-10 rounded-md bg-white border border-slate-200 shadow-md p-2 text-sm text-slate-700'>
              Link copied!
            </p>
          )}

          {/* Listing Details */}
          <div className='flex flex-col max-w-4xl mx-auto p-4 my-7 gap-5'>
            <p className='text-2xl sm:text-3xl font-bold text-slate-800'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>

            <p className='flex items-center gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-emerald-700' />
              {listing.address}
            </p>

            <div className='flex gap-3'>
              <p className='bg-[#29483F] w-full max-w-[160px] text-white text-center py-1.5 rounded-lg text-sm font-semibold uppercase'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-emerald-800 w-full max-w-[160px] text-white text-center py-1.5 rounded-lg text-sm font-semibold'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className='text-slate-700 leading-relaxed'>
              <span className='font-semibold text-slate-900'>Description: </span>
              {listing.description}
            </p>

            <ul className='text-[#29483F] font-medium text-sm flex flex-wrap items-center gap-4 sm:gap-6 bg-[#FAF9F6] p-4 rounded-xl border border-[#DDD6C8]'>
              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : `${listing.bedrooms} Bed`}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Contact Landlord Trigger */}
            {!currentUser && (
              <Link
                to='/signin'
                className='bg-[#29483F] text-white rounded-xl uppercase hover:bg-[#203A33] p-3 text-center text-sm font-medium transition'
              >
                Sign in to contact landlord
              </Link>
            )}

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#29483F] text-white rounded-xl uppercase hover:bg-[#203A33] p-3 text-sm font-medium transition'
              >
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}