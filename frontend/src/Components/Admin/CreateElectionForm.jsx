// src/Components/Admin/CreateElectionForm.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';

function CreateElectionForm() {
  const { id } = useParams(); // Get the admin ID from the route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    electionName: '',
    electionId: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.electionName || !formData.electionId) {
      setError('Both Election Name and Election ID are required');
      setTimeout(() => setError(''), 2000);
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.post(
        `${server}/elections`,
        {
            admin: id,
          name: formData.electionName,
          electionId: formData.electionId,
          
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.data) {
        // Get the election ID from the response
        const createdElection = response.data.data;
        
        // Redirect to the specific election page
        navigate(`/admin/${id}/election/${createdElection.electionId}`);
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create election');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleBack = () => {
    navigate(`/admin/${id}/election`);
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center p-6 overflow-auto">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <h1 className="text-5xl font-extrabold text-white mb-6">Create New Election</h1>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-full text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="electionName"
              className="text-2xl font-light text-white mb-2"
            >
              Election Name
            </label>
            <input
              type="text"
              id="electionName"
              name="electionName"
              value={formData.electionName}
              onChange={handleChange}
              className="bg-gray-800 text-white p-3 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="electionId"
              className="text-2xl font-light text-white mb-2"
            >
              Election ID
            </label>
            <input
              type="text"
              id="electionId"
              name="electionId"
              value={formData.electionId}
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

export default CreateElectionForm;