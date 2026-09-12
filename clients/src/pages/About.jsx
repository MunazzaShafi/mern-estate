import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRegBuilding, 
  FaHandshake, 
  FaShieldAlt, 
  FaChartLine, 
  FaArrowRight 
} from 'react-icons/fa';
import Footer from '../Components/Footer';

export default function About() {
  const highlights = [
    {
      icon: <FaShieldAlt className="text-2xl text-[#29483F]" />,
      title: 'Verified Portfolios',
      desc: 'Rigorous legal and architectural verification on every listing to safeguard your investment.',
    },
    {
      icon: <FaChartLine className="text-2xl text-[#29483F]" />,
      title: 'Market Intelligence',
      desc: 'In-depth valuation models and regional growth analytics across prime residential hubs.',
    },
    {
      icon: <FaHandshake className="text-2xl text-[#29483F]" />,
      title: 'Direct Negotiations',
      desc: 'Transparent owner-to-buyer engagement without opaque intermediary markups.',
    },
    {
      icon: <FaRegBuilding className="text-2xl text-[#29483F]" />,
      title: 'Diverse Inventory',
      desc: 'From high-rise urban penthouses to suburban family villas and affordable community housing.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-800 flex flex-col min-h-screen justify-between">
      <div>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-5 max-w-6xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[4px] font-bold text-[#8A806F] bg-[#F1EDE3] px-3.5 py-1.5 rounded-full inline-block mb-4">
            Redefining Property Discovery
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#29483F] leading-tight max-w-3xl mx-auto">
            Built on Trust, Modern Architecture, and Transparent Deals.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#6D756F] max-w-2xl mx-auto leading-relaxed">
            BellaEstate is a premier real estate ecosystem committed to simplifying the process of buying, selling, and leasing high-caliber properties across prime locations.
          </p>
        </section>

        {/* Overview & Mission */}
        <section className="px-5 max-w-6xl mx-auto pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border border-[#DED8CA] rounded-3xl p-8 md:p-12 shadow-sm">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#29483F] mb-4">
                Our Vision & Commitment
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Real estate transactions are significant financial milestones. At BellaEstate, we bridge the gap between property buyers, investors, and homeowners by providing real-time data, high-resolution visual tours, and transparent market valuations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you are acquiring a luxury corner residence, expanding an investment portfolio, or securing an affordable rental home, our platform ensures efficiency and security at every touchpoint.
              </p>
            </div>
            <div className="bg-[#F8F1E8] border border-[#DDD6C8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <p className="text-xs uppercase font-semibold tracking-wider text-[#8A806F]">
                  Our Principle
                </p>
                <h3 className="text-xl font-bold text-[#29483F] mt-2 mb-3">
                  Integrity in Every Sq. Ft.
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We believe in providing accurate property specifications, direct contact with verified landlords, and verified location mapping without inflated pricing.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-[#DDD6C8] pt-6 mt-6">
                <div>
                  <p className="text-2xl font-bold text-[#29483F]">100%</p>
                  <p className="text-xs text-[#8A806F]">Direct Listings</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#29483F]">24/7</p>
                  <p className="text-xs text-[#8A806F]">Platform Access</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#29483F]">Fast</p>
                  <p className="text-xs text-[#8A806F]">Direct Reach</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="px-5 max-w-6xl mx-auto pb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#29483F]">
              Why Choose BellaEstate
            </h2>
            <p className="text-sm text-[#8A806F] mt-2">
              Engineered to make property searches streamlined, reliable, and accessible.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DED8CA] rounded-2xl p-6 shadow-sm hover:border-[#29483F] transition duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F8F1E8] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#29483F] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="px-5 max-w-6xl mx-auto pb-20">
          <div className="bg-[#29483F] rounded-3xl p-8 md:p-12 text-center text-white flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-xl">
              Ready to Find Your Next Space?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-lg">
              Explore active listings for sale and rent across prime communities with direct owner contacts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/search"
                className="bg-[#E8C98D] text-[#29483F] font-semibold px-6 py-3 rounded-xl hover:bg-[#dec084] transition flex items-center gap-2 text-sm"
              >
                Explore Listings
                <FaArrowRight size={12} />
              </Link>
              <Link
                to="/create-listing"
                className="border border-[#E8C98D]/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-[#203A33] transition text-sm"
              >
                Post a Property
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}