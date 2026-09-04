import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/users/userSlice.js';
// import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#29483F] mb-4">
            <span className="text-[#E8C98D] text-xl font-bold">
              B
            </span>
          </div>

          <h1 className="text-3xl font-bold text-[#29483F]">
            Welcome Back!
          </h1>

          <p className="text-sm text-[#8A806F] mt-2">
            Join BellaEstate and find a place you’ll love.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#DED8CA] rounded-2xl p-7 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
           
            

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#29483F] mb-2" 
              >
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-[#DDD6C8] bg-[#FAF9F6]
                           p-3 rounded-xl outline-none text-sm
                           text-[#29483F] placeholder:text-[#A39B8D]
                           focus:border-[#52796F] focus:ring-1
                           focus:ring-[#52796F] transition"
                id="email"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#29483F] mb-2"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-[#DDD6C8] bg-[#FAF9F6]
                           p-3 rounded-xl outline-none text-sm
                           text-[#29483F] placeholder:text-[#A39B8D]
                           focus:border-[#52796F] focus:ring-1
                           focus:ring-[#52796F] transition"
                id="password"
                onChange={handleChange}
              />
            </div>

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-[#29483F] text-white p-3 rounded-xl
                         font-medium text-sm uppercase tracking-wide
                         hover:bg-[#203A33] transition
                         disabled:opacity-80 mt-1"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Sign In */}
          <div className="flex justify-center gap-2 mt-6 text-sm">
                      <p className="text-[#7B817C]">Don't have an account?</p>
          
                      <Link to="/signup">
                        <span className="text-[#df271a] font-medium hover:underline">
                          Sign up
                        </span>
                      </Link>
                    </div>
        
        </div>

        
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
    
  );
}
