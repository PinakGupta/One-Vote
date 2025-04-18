// src/Components/Admin/AddVoters.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';

function AddVoters() {
  const { id, electionId } = useParams(); // Get admin ID and electionId from the route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    voterId: '',
  });
  const [voters, setVoters] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch voters for the election
  const fetchVoters = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to add voters');
        setTimeout(() => setError(''), 2000);
        return;
      }
      console.log(electionId)
      const response = await api.get(`${server}/elections/${electionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVoters(response.data.data.voters || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch voters');
      setTimeout(() => setError(''), 2000);
    }
  };

  // Fetch voters on mount if electionId is available
  useEffect(() => {
    if (electionId) {
      fetchVoters();
    } else {
      setError('Election ID is missing');
      setTimeout(() => setError(''), 2000);
    }
  }, [electionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.voterId) {
      setError('Voter ID is required');
      setTimeout(() => setError(''), 2000);
      return;
    }
    if (!electionId) {
      setError('Election ID is missing');
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Please log in to add voters');
        setTimeout(() => setError(''), 2000);
        return;
      }
      const response = await api.patch(
        `${server}/elections/${electionId}/voters`,
        { voters: [parseInt(formData.voterId)] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setVoters(response.data.data.voters || []);
        setFormData({ ...formData, voterId: '' }); // Clear voterId input
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add voter');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleBack = () => {
    navigate(`/admin/${id}/election/${electionId || ''}`);
  };

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center p-6">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white mb-6">Add Voter</h1>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-full text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="voterId"
              className="text-2xl font-light text-white mb-2"
            >
              Voter ID
            </label>
            <input
              type="number"
              id="voterId"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold text-xl py-3 px-8 rounded-xl hover:bg-green-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-600 text-white font-bold text-xl py-3 px-8 rounded-xl hover:bg-gray-700 transition"
            >
              Back
            </button>
          </div>
        </form>
        <div className="w-full mt-8">
          <h2 className="text-3xl font-bold text-white mb-4">Eligible Voters</h2>
          {voters.length > 0 ? (
            <ul className="bg-gray-800 p-4 rounded-md">
              {voters.map((voterId) => (
                <li key={voterId} className="text-white text-lg py-1">
                  {voterId}
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