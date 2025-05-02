import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';
import { userContext } from '../../context';
import '../../Styles/CandidateList.css';
import { format } from 'date-fns';

/**
 * ViewCandidates component for displaying a list of candidates in an election.
 * Fetches and renders candidate data in a table with navigation to details.
 */
function ViewCandidates() {
  const { visitorType } = useContext(userContext);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const { adminId, electionId } = useParams();

  // Fetch candidates when electionId changes
  useEffect(() => {
    if (electionId) {
      fetchCandidates();
    }
  }, [electionId]);

  /**
   * Fetch candidates from the backend for the specified election.
   */
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(
        `${server}/candidates/candidate-list/${adminId}/${electionId}/view-candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidates(response.data.data.candidates || []);
    } catch (err) {
      console.error('Fetch Candidates Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch candidates');
    }
  };

  // Clear error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Format a date string to a readable format.
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date or error message
   */
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      <div className="w-full px-8 py-10 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Candidate Registry</h1>
            <p className="text-gray-400 mt-3 text-xl">
              Comprehensive list of all registered election candidates
            </p>
          </div>
          <Link
            to={`/admin/election/${electionId}`}
            state={{ visitorType }}
            className="inline-block px-8 py-3 border-2 border-[#0099ff] text-[#0099ff] rounded-lg text-lg font-medium hover:bg-[#0099ff] hover:text-white transition-colors"
          >
            Back
          </Link>
        </div>

        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900 border border-red-600 text-red-200 px-6 py-3 rounded shadow-lg z-50">
            {error}
          </div>
        )}

        {candidates.length === 0 ? (
          <div className="bg-[#121212] rounded-xl p-16 text-center h-80 flex items-center justify-center">
            <p className="text-gray-400 text-2xl">No candidates registered yet</p>
          </div>
        ) : (
          <div
            className="overflow-hidden rounded-xl shadow-lg h-[calc(100vh-220px)]"
            style={{ boxShadow: '0 0 40px rgba(88, 88, 255, 0.25)' }}
          >
            <div className="overflow-y-auto h-full">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#121212] border-b-2 border-[#333333]">
                    <th className="px-10 py-6 text-left text-xl font-semibold">Profile</th>
                    <th className="px-10 py-6 text-left text-xl font-semibold">Details</th>
                    <th className="px-10 py-6 text-left text-xl font-semibold">Location</th>
                    <th className="px-10 py-6 text-left text-xl font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, index) => (
                    <tr
                      key={candidate._id}
                      className={`border-b-2 border-[#333333] ${
                        index % 2 === 0 ? 'bg-[#191919]' : 'bg-[#121212]'
                      } hover:bg-[#202020] transition-colors`}
                    >
                      {/* Profile Column */}
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-28 h-28 rounded-full overflow-hidden bg-[#252525] flex-shrink-0 border-3 border-[#0099ff]">
                            <img
                              src={candidate.avatar || 'https://via.placeholder.com/150'}
                              alt={`${candidate.firstName} ${candidate.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">
                              {candidate.firstName} {candidate.lastName}
                            </h3>
                            <p className="text-lg text-gray-400 mt-2">
                              Email: {candidate.email || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Details Column */}
                      <td className="px-10 py-8">
                        <div className="space-y-3">
                          <p className="text-lg">
                            <span className="text-gray-400">DOB:</span>{' '}
                            {formatDate(candidate.dob)}
                          </p>
                          <p className="text-lg">
                            <span className="text-gray-400">Status:</span>{' '}
                            <span
                              className={`px-4 py-1.5 rounded-full text-base ${
                                candidate.candidateType === 'New'
                                  ? 'bg-green-800 text-green-200'
                                  : 'bg-blue-800 text-blue-200'
                              }`}
                            >
                              {candidate.candidateType}
                            </span>
                          </p>
                        </div>
                      </td>

                      {/* Location Column */}
                      <td className="px-10 py-8">
                        <div className="space-y-3">
                          <p className="text-lg">
                            <span className="text-gray-400">Town:</span> {candidate.town}
                          </p>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-10 py-8">
                        <Link
                          to={`/admin/${adminId}/election/${electionId}/candidate/${candidate._id}`}
                          className="inline-block px-6 py-3 bg-[#5800FF] text-white rounded-lg hover:bg-[#4600cc] transition-colors text-center"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Outlet for CandidateDetails */}
      <Outlet />
    </div>
  );
}

export default ViewCandidates;