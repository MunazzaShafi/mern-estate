import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter 
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#203A33] text-slate-300 border-t border-[#29483F]">
      {/* Main Footer Container */}
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Overview */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#29483F] border border-[#E8C98D]/30 flex items-center justify-center">
                <span className="text-[#E8C98D] font-bold text-lg">B</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-none">BellaEstate</h2>
                <p className="text-[8px] tracking-[2.5px] text-[#E8C98D] mt-1 uppercase">
                  Find Your Place
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              A modern real estate ecosystem offering verified property portfolios, clear valuations, and direct buyer-to-owner engagement.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#29483F] flex items-center justify-center text-slate-300 hover:text-[#E8C98D] hover:bg-[#25423a] transition"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#29483F] flex items-center justify-center text-slate-300 hover:text-[#E8C98D] hover:bg-[#25423a] transition"
              >
                <FaInstagram size={13} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#29483F] flex items-center justify-center text-slate-300 hover:text-[#E8C98D] hover:bg-[#25423a] transition"
              >
                <FaLinkedinIn size={13} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#29483F] flex items-center justify-center text-slate-300 hover:text-[#E8C98D] hover:bg-[#25423a] transition"
              >
                <FaTwitter size={13} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-[#29483F] pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#E8C98D] transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E8C98D] transition">About Us</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-[#E8C98D] transition">Browse Properties</Link>
              </li>
              <li>
                <Link to="/search?offer=true" className="hover:text-[#E8C98D] transition">Special Offers</Link>
              </li>
              <li>
                <Link to="/create-listing" className="hover:text-[#E8C98D] transition">List a Property</Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-[#29483F] pb-2 inline-block">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link to="/search?type=sale" className="hover:text-[#E8C98D] transition">Residential for Sale</Link>
              </li>
              <li>
                <Link to="/search?type=rent" className="hover:text-[#E8C98D] transition">Rental Units & Penthouses</Link>
              </li>
              <li>
                <Link to="/search?type=sale&offer=true" className="hover:text-[#E8C98D] transition">Discounted Bungalows</Link>
              </li>
              <li>
                <Link to="/search?parking=true" className="hover:text-[#E8C98D] transition">Houses with Dedicated Parking</Link>
              </li>
              <li>
                <Link to="/search?furnished=true" className="hover:text-[#E8C98D] transition">Furnished Living Spaces</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-[#29483F] pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3 text-slate-300">
                <FaMapMarkerAlt className="text-[#E8C98D] mt-1 shrink-0" size={14} />
                <span>Sector J, Phase 6, DHA, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <FaPhoneAlt className="text-[#E8C98D] shrink-0" size={13} />
                <span>+92 (300) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <FaEnvelope className="text-[#E8C98D] shrink-0" size={13} />
                <span>support@bellaestate.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#29483F] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} BellaEstate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-[#E8C98D] transition">Privacy Policy</Link>
            <Link to="/about" className="hover:text-[#E8C98D] transition">Terms of Service</Link>
            <Link to="/about" className="hover:text-[#E8C98D] transition">Legal Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}