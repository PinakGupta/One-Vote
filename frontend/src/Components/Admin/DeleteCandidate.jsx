import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';
import { userContext } from '../../context';
import '../../Styles/CandidateList.css';

/**
 * DeleteCandidate component for removing candidates from an election.
 * Displays a list of candidates with a delete button for each.
 */
function DeleteCandidate() {
  const { visitorType } = useContext(userContext);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id, electionId } = useParams(); // id is adminId, electionId is MongoDB ObjectId

  // Fetch candidates when electionId changes
  useEffect(() => {
    fetchCandidates();
  }, [electionId]);

  /**
   * Fetch candidates from the backend for the specified election.
   */
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to view candidates');
        return;
      }
      const response = await api.get(
        `${server}/candidates/candidate-list/${id}/${electionId}/view-candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedCandidates = response.data.data?.candidates || [];
      // Map backend fields to UI-expected fields
      setCandidates(
        fetchedCandidates.map((candidate) => ({
          candidateId: candidate._id,
          candidateName: `${candidate.firstName} ${candidate.lastName}`,
          photoUrl: candidate.avatar || 'https://via.placeholder.com/150',
          email: candidate.email || 'No email',
          town: candidate.town || 'No town',
          candidateType: candidate.candidateType || 'Unknown',
        }))
      );
      setError('');
    } catch (err) {
      console.error('Fetch Error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to fetch candidates');
      setCandidates([]);
    }
  };

  /**
   * Delete a candidate from the election.
   * @param {string} candidateId - ID of the candidate to delete
   */
  const handleDeleteCandidate = async (candidateId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this candidate? This action is irreversible.'
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to delete candidates');
        return;
      }
      await api.delete(
        `${server}/candidates/candidate-list/election/${electionId}/candidates/${candidateId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.candidateId !== candidateId)
      );
      setSuccess('Candidate removed successfully');
    } catch (error) {
      console.error('Delete Error:', error.response || error);
      setError(error.response?.data?.message || 'Failed to delete candidate');
    }
  };

  // Clear error or success messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Remove a Candidate</h1>
        <p className="text-gray-400 mb-6">Select a candidate to remove permanently</p>

        <Link
          to={`/admin/${id}/election/${electionId}`}
          state={{ visitorType }}
          className="inline-block px-6 py-2 mb-8 border border-[#0099ff] text-[#0099ff] rounded hover:bg-[#0099ff] hover:text-white transition-colors"
        >
          Back
        </Link>

        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded shadow-lg z-50">
            {error}
          </div>
        )}
        {success && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded shadow-lg z-50">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {candidates.length === 0 ? (
            <p className="text-gray-400">No candidates registered yet</p>
          ) : (
            candidates.map((candidate) => (
              <div
                key={candidate.candidateId}
                className="relative bg-[#121212] rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: '0 0 20px rgba(88, 88, 255, 0.2)',
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-48 h-48 rounded-lg overflow-hidden">
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.candidateName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log(`Failed to load image for ${candidate.candidateName}`);
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center">{candidate.candidateName}</h3>
                  <p className="text-gray-400 text-center">{candidate.email}</p>
                  <p className="text-gray-400 text-center">{candidate.town}</p>
                  <button
                    className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCandidate(candidate.candidateId);
                    }}
                  >
                    Remove Candidate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteCandidate;