import "../Styles/SignUp.css";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { server } from "../server.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../Redux/slicer.js";
import { userContext } from "../context.js";

function Register() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: "",
    role: "user", // Default role
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { changeVisitorType, updateVisitorId } = useContext(userContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "avatar") {
      setData({ ...data, avatar: e.target.files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await axios.post(`${server}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const userData = response?.data?.data;
        
        // Save token to localStorage
        localStorage.setItem("accessToken", response.data.cookies?.token || response.data.data.accessToken);
        
        // Update visitor type in context
        changeVisitorType(userData.role || "user");
        
        // For admin users, redirect directly
        if (userData.role === "admin") {
          updateVisitorId(userData._id);
          dispatch(setUserId(userData._id));
          navigate(`/admin/${userData._id}/election`);
        } else {
          // For regular users, navigate to OTP verification
          navigate("/api/v1/otp/verify", { 
            state: { userData } 
          });
        }
      } else {
        throw new Error("Error while registering a user");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErr(
        err.response?.data?.message ||
          "Sorry for the inconvenience, we are resolving the issue"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErr("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [err]);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-0 m-0 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Error notification with animation */}
      {err && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-900/80 backdrop-blur-sm border-l-4 border-red-500 text-red-100 px-6 py-4 rounded-lg shadow-2xl max-w-md flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm md:text-base">{err}</p>
          </div>
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-7xl h-auto md:h-5/6 bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
          <div className="md:flex h-full">
            {/* Left side: Image/Illustration (hidden on mobile) */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-800 to-purple-900 p-12 relative overflow-hidden">
              <div className="relative h-full flex flex-col justify-center items-center z-10">
                <div className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Welcome to Our Platform</h1>
                <p className="text-xl text-indigo-200 text-center mb-8">Join our community and unlock a world of possibilities</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transform transition-all hover:scale-105 duration-300">
                    <div className="text-indigo-300 text-3xl font-bold">24/7</div>
                    <div className="text-white">Support</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transform transition-all hover:scale-105 duration-300">
                    <div className="text-indigo-300 text-3xl font-bold">100%</div>
                    <div className="text-white">Secure</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transform transition-all hover:scale-105 duration-300">
                    <div className="text-indigo-300 text-3xl font-bold">Fast</div>
                    <div className="text-white">Processing</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm transform transition-all hover:scale-105 duration-300">
                    <div className="text-indigo-300 text-3xl font-bold">Easy</div>
                    <div className="text-white">Setup</div>
                  </div>
                </div>
              </div>
              {/* Animated shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <div className="absolute w-40 h-40 rounded-full border-8 border-indigo-400/40 animate-float1"></div>
                <div className="absolute w-60 h-60 top-20 right-10 rounded-full border-8 border-purple-400/40 animate-float2"></div>
                <div className="absolute w-20 h-20 bottom-20 left-10 rounded-full border-8 border-blue-400/40 animate-float3"></div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="md:w-1/2 p-8 md:p-12 max-h-full overflow-y-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-white mb-2 animate-fade-in-up">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    Create Account
                  </span>
                </h2>
                <p className="text-gray-400 animate-fade-in-up animation-delay-100">
                  Already have an account?{" "}
                  <Link to="/api/v1/auth/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300 border-b border-indigo-400 border-opacity-0 hover:border-opacity-100">
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animation-delay-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="firstName">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                        name="firstName"
                        id="firstName"
                        type="text"
                        onChange={handleChange}
                        value={data.firstName}
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="lastName">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                        name="lastName"
                        id="lastName"
                        type="text"
                        onChange={handleChange}
                        value={data.lastName}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="email">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                        name="email"
                        id="email"
                        type="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="example@domain.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="group md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300"
                        name="password"
                        id="password"
                        type="password"
                        onChange={handleChange}
                        value={data.password}
                        placeholder="Create a secure password"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="role">
                      Account Type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <select
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white transition-all duration-300 appearance-none"
                        name="role"
                        id="role"
                        onChange={handleChange}
                        value={data.role}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-400 mb-1 transition-all duration-300 group-focus-within:text-indigo-400" htmlFor="avatar">
                      Profile Picture
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        className="block w-full bg-gray-800/50 border border-gray-700 pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white file:bg-indigo-600 file:border-0 file:text-white file:px-4 file:py-1 file:mr-4 file:rounded-md file:cursor-pointer file:hover:bg-indigo-700 transition-all duration-300"
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                  <Link
                    to="/"
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-center border border-gray-700 transition-all duration-300 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:ring-offset-gray-900"
                  >
                    Go Back
                  </Link>
                </div>
              </form>

              <div className="mt-8 text-center animate-fade-in-up animation-delay-300">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 20px) rotate(180deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, 30px) rotate(-180deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -20px) rotate(180deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-20px) translateX(-50%); opacity: 0; }
          100% { transform: translateY(0) translateX(-50%); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float1 {
          animation: float1 10s infinite;
        }
        
        .animate-float2 {
          animation: float2 14s infinite;
        }
        
        .animate-float3 {
          animation: float3 12s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Register;