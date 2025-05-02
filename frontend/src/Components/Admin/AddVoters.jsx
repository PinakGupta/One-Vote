import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';

/**
 * AddVoters component for adding voters to an election by email.
 * Displays a form to input voter emails and a list of added voters.
 */
function AddVoters() {
  const { id, electionId } = useParams(); // id is adminId, electionId is MongoDB ObjectId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
  });
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Handle input changes for the email field.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Fetch voters for the election from the backend.
   */
  const fetchVoters = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to view voters');
        return;
      }
      const response = await api.get(`${server}/elections/${electionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVoters(response.data.data.voters || []);
    } catch (err) {
      console.error('Fetch Voters Error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to fetch voters');
    }
  };

  // Fetch voters on mount if electionId is available
  useEffect(() => {
    if (electionId) {
      fetchVoters();
    } else {
      setError('Election ID is missing');
    }
  }, [electionId]);

  /**
   * Handle form submission to add a voter by email.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Email is required');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!electionId) {
      setError('Election ID is missing');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to add voters');
        return;
      }
      const response = await api.patch(
        `${server}/elections/${electionId}/voters`,
        { voters: [formData.email] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setVoters(response.data.data.voters || []);
        setFormData({ ...formData, email: '' }); // Clear email input
        setSuccess('Voter added successfully');
      }
    } catch (err) {
      console.error('Add Voter Error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to add voter');
    }
  };

  /**
   * Navigate back to the election dashboard.
   */
  const handleBack = () => {
    navigate(`/admin/${id}/election/${electionId}`);
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
    <div className="min-h-screen w-screen bg-[#1a1a1a] flex flex-col items-center p-6">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white mb-6">Add Voter</h1>
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
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-2xl font-light text-white mb-2">
              Voter Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#2a2a2a] text-white p-3 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#0099ff]"
              placeholder="example@domain.com"
              required
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-[#5800FF] text-white font-bold text-xl py-3 px-8 rounded-xl hover:bg-[#4600cc] transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-700 text-white font-bold text-xl py-3 px-8 rounded-xl hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>
        </form>
        <div className="w-full mt-8">
          <h2 className="text-3xl font-bold text-white mb-4">Eligible Voters</h2>
          {voters.length > 0 ? (
            <ul className="bg-[#2a2a2a] p-4 rounded-md">
              {voters.map((email, index) => (
                <li key={index} className="text-white text-lg py-1">
                  {email || 'Unknown email'}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-lg">No voters added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddVoters;