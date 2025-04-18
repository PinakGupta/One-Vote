// src/Components/Admin/AddVoters.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddVoters() {
  const { id } = useParams(); // Get the admin ID from the route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    voterId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.voterId) {
      setError('Voter ID is required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Log form data (replace with API call if needed)
    console.log('Voter ID:', formData.voterId);

    // Navigate to admin dashboard
    navigate(`/admin/${id}`);
  };

  const handleBack = () => {
    navigate(`/admin/${id}`);
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
      </div>
    </div>
  );
}

export default AddVoters;