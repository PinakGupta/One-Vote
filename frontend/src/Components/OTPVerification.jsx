import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../server.js";
import { userContext } from "../context.js";

function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  const { updateVisitorId } = useContext(userContext);

  // Handle input change for OTP digits
  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    if (isNaN(value) && value !== "") {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle keydown events for backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event for the entire OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs.current[5].focus();
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${server}/otp/verify`, {
        email: userData.email,
        otp: otpValue
      });

      if (response.status === 200) {
        setSuccess("Email verified successfully!");
        
        // Wait for success message to be shown
        setTimeout(() => {
          // Get user data from response or use existing data
          const userId = response.data?.data?._id || userData._id;
          const userRole = response.data?.data?.role || userData.role;
          updateVisitorId(userId);
          
          // Check user role and navigate accordingly
          if (userRole === "admin") {
            navigate(`/admin/${userId}`);
          } else {
            navigate(`/${userId}`);
          }
        }, 1500);
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setError(
        err.response?.data?.message || 
        "Failed to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    if (resendDisabled) return;
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const response = await axios.post(`${server}/otp/resend`, {
        email: userData.email
      });

      if (response.status === 200) {
        setSuccess("OTP resent successfully!");
        
        // Start countdown and disable resend button
        setResendDisabled(true);
        setCountdown(60);
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      setError(
        err.response?.data?.message || 
        "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  // Redirect to login if no user data
  useEffect(() => {
    if (!userData) {
      navigate("/api/v1/auth/login");
    }
  }, [userData, navigate]);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [error, success]);

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-0 m-0 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Error notification with animation */}
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-900/80 backdrop-blur-sm border-l-4 border-red-500 text-red-100 px-6 py-4 rounded-lg shadow-2xl max-w-md flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm md:text-base">{error}</p>
          </div>
        </div>
      )}

      {/* Success notification with animation */}
      {success && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-900/80 backdrop-blur-sm border-l-4 border-green-500 text-green-100 px-6 py-4 rounded-lg shadow-2xl max-w-md flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm md:text-base">{success}</p>
          </div>
        </div>
      )}

      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-500 p-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-900/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Verify Your Email
              </span>
            </h2>
            <p className="text-gray-400 animate-fade-in-up animation-delay-100">
              We've sent a 6-digit verification code to
              <span className="font-medium text-indigo-400 ml-1 break-all">{userData?.email}</span>
            </p>
          </div>

          <div className="mb-8 animate-fade-in-up animation-delay-200">
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : null}
                  className="w-12 h-14 text-center text-2xl font-bold text-white bg-gray-800/80 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              ))}
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying...</span>
                </div>
              ) : (
                <span>Verify Email</span>
              )}
            </button>
          </div>

          <div className="text-center mt-6 animate-fade-in-up animation-delay-300">
            <p className="text-sm text-gray-400 mb-2">
              Didn't receive the code?{" "}
              <button
                onClick={resendOTP}
                disabled={resendDisabled || loading}
                className={`font-medium ${
                  resendDisabled 
                    ? "text-gray-500 cursor-not-allowed" 
                    : "text-indigo-400 hover:text-indigo-300 border-b border-indigo-400 border-opacity-0 hover:border-opacity-100 transition-colors duration-300"
                }`}
              >
                {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-6">
              Having trouble? Contact our <a href="#" className="text-indigo-400 hover:text-indigo-300">support team</a>
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
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

export default OTPVerification;