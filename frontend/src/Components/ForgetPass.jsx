import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { server } from '../server.js';
import { useNavigate } from 'react-router-dom';
import api from '../axiosInstance.js';
import { userContext } from '../context.js';
import { useSelector } from 'react-redux';

/**
 * ForgetPass component for initiating a password reset.
 * Users enter their email to receive a reset link.
 */
function ForgetPass() {
  const { visitorType } = useContext(userContext);
  const userId = useSelector((state) => state.userValues.userId);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
  });
  const [err, setErr] = useState('');

  /**
   * Handle input changes for the email field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handle form submission to initiate password reset.
   * Sends email to the backend and redirects to reset page.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(data.email)) {
        setErr('Please enter a valid email address');
        return;
      }

      const response = await api.post(
        `${server}/auth/login/forget-password`,
        { email: data.email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setData({ email: '' });
        navigate(`/create-new-password/${response.data.data._id}`);
        setErr('');
      } else {
        throw new Error('Error while initiating password reset');
      }
    } catch (error) {
      console.error('Forget Password Error:', error);
      setErr(error.response?.data?.message || 'Failed to initiate password reset. Please try again.');
    }
  };

  // Clear error messages after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setErr('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [err]);

  return (
    <div id="login">
      {err && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>{err}</p>
        </div>
      )}
      <div className="log">
        <div className="signup-heading flex gap-5 flex-col">
          <p className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold">
            Forgot Password?
          </p>
          <p className="flex flex-row gap-5 sm:text-2xl lg:text-3xl xl:text-2xl font-semibold">
            Enter your email to create a new password
          </p>
        </div>
        <form className="flex" onSubmit={handleSubmit}>
          <div className="signup-form flex flex-col gap-10">
            <div className="field email">
              <label
                className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light"
                htmlFor="email"
              >
                Enter Email Address
              </label>
              <input
                className="sm:w-3/4 text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-semibold"
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
          <div className="button flex gap-8">
            <button
              type="submit"
              id="button"
              className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
            >
              <span>Check for my Account</span>
            </button>
            <button
              type="button"
              id="back"
              className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
            >
              {visitorType ? (
                <Link to={`/${userId}/api/v1/user/profile`}>
                  <span>Back</span>
                </Link>
              ) : (
                <Link to="/api/v1/auth/login">
                  <span>Back</span>
                </Link>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;