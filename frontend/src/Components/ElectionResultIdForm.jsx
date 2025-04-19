import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../server';

const ElectionResultIdForm = () => {
  const [electionId, setElectionId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${server}/elections/check-eligibility`, {
        userId,
        electionId
      });

      if (response.data.eligible) {
        navigate(`/${userId}/api/v1/election/${electionId}/result`);
      } else {
        setError('You are not eligible to view results for this election.');
      }
    } catch (err) {
      console.error('Error checking eligibility:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while checking eligibility. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setElectionId(e.target.value);
    // Clear error when user starts typing a new ID
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0 opacity-80"></div>
      
      {/* Animated circles in background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-900 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className={`sm:mx-auto sm:w-full sm:max-w-xl z-10 transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="mt-6 text-center text-5xl font-extrabold text-white mb-6">
          View Election Results
        </h2>
        <p className="text-center text-xl text-gray-300 mb-10">
          Enter the election ID to view results
        </p>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-xl z-10 transition-all duration-1000 delay-300 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-gray-900 py-12 px-8 shadow-2xl rounded-2xl border border-gray-800 backdrop-filter backdrop-blur-sm bg-opacity-80">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="electionId" className="block text-xl font-medium text-gray-200 mb-3">
                Election ID
              </label>
              <div className="mt-1">
                <input
                  id="electionId"
                  name="electionId"
                  type="text"
                  required
                  value={electionId}
                  onChange={handleChange}
                  className="appearance-none block w-full px-5 py-4 border border-gray-700 rounded-xl shadow-sm placeholder-gray-500 bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Enter election ID here"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-lg mt-4 p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-800">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </span>
                ) : (
                  'View Results'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Animated pulse at the bottom */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-75">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ElectionResultIdForm;