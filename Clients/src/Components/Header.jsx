import { FaSearch, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-[#F8F1E8] border-b border-[#DED8CA]">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#29483F] flex items-center justify-center">
              <span className="text-[#E8C98D] font-bold text-lg">B</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#29483F] leading-none">
                BellaEstate
              </h1>

              <p className="text-[9px] tracking-[3px] text-[#8A806F] mt-1">
                FIND YOUR PLACE
              </p>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            className="hidden md:flex items-center bg-white border border-[#DDD6C8]
                            rounded-xl px-4 py-2.5 w-64 lg:w-80 xl:w-96
                            shadow-sm focus-within:border-[#29483F] transition"
          >
            <FaSearch className="text-[#8A806F] mr-3" size={14} />

            <input
              type="text"
              placeholder="Search properties..."
              className="w-full bg-transparent outline-none text-sm text-[#29483F]
                         placeholder:text-[#A39B8D]"
            />
          </form>

          {/* Right Navigation */}
          <nav className="flex items-center gap-5 lg:gap-7 shrink-0">
            <Link
              to="/"
              className="hidden sm:block text-sm font-medium text-[#29483F]
                         hover:text-[#A67C3D] transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hidden sm:block text-sm font-medium text-[#6D756F]
                         hover:text-[#A67C3D] transition"
            >
              About
            </Link>
            
            <Link to={currentUser ? "/profile" : "/signin"}>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center gap-2 bg-[#29483F] text-white px-4 lg:px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#203A33] transition">
                  Sign In
                  <FaArrowRight size={10} />
                </div>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        <form
          className="flex md:hidden items-center bg-white border border-[#DDD6C8]
                          rounded-xl px-4 py-2.5 mt-4"
        >
          <FaSearch className="text-[#8A806F] mr-3" size={14} />

          <input
            type="text"
            placeholder="Search properties..."
            className="w-full bg-transparent outline-none text-sm
                       text-[#29483F] placeholder:text-[#A39B8D]"
          />
        </form>
      </div>
    </header>
  );
}
