import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../axiosInstance';
import { server } from '../../server';
import axios from 'axios';
import '../../Styles/AddCandidate.css';

/**
 * UpdateCandidateForm component for updating an existing candidate's details.
 * Allows admins to modify candidate information and promises.
 */
function UpdateCandidateForm() {
  const { id, electionId, candidateId } = useParams(); // id is adminId
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    avatar: '',
    email: '',
    town: '',
    candidateType: '',
    dob: '',
    promise: '',
    promises: [],
  });

  // Fetch states and candidate data on mount or candidateId change
  useEffect(() => {
    fetchStates();
    fetchCandidateData();
  }, [candidateId]);

  /**
   * Fetch states from the backend for the town dropdown.
   */
  const fetchStates = async () => {
    try {
      const response = await axios.get(`${server}/api/districts-and-states/district-state`);
      const areas = response.data.data?.[0]?.apiData?.states || [];
      setStates(areas.map((item) => item.state));
    } catch (err) {
      setError('Failed to fetch states');
    }
  };

  /**
   * Fetch candidate data from the backend to populate the form.
   */
  const fetchCandidateData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await api.get(`${server}/candidates/candidate-list/${candidateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const candidate = response.data.data;
      setFormData({
        firstName: candidate.firstName || '',
        lastName: candidate.lastName || '',
        avatar: '',
        email: candidate.email || '',
        town: candidate.town || '',
        candidateType: candidate.candidateType || '',
        dob: candidate.dob ? candidate.dob.split('T')[0] : '',
        promise: '',
        promises: Array.isArray(candidate.promise) ? candidate.promise : [candidate.promise].filter(Boolean),
      });
    } catch (err) {
      console.error('Fetch Candidate Data Error:', err);
      setError('Failed to fetch candidate data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input changes for text, select, and file fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /**
   * Add a new promise to the promises array.
   */
  const handlePromiseAdd = () => {
    if (formData.promise.trim()) {
      setFormData((prev) => ({
        ...prev,
        promises: [...prev.promises, prev.promise],
        promise: '',
      }));
    }
  };

  /**
   * Delete a promise from the promises array.
   * @param {number} index - Index of the promise to delete
   */
  const handlePromiseDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      promises: prev.promises.filter((_, i) => i !== index),
    }));
  };

  /**
   * Handle form submission to update the candidate.
   * Sends multipart/form-data with updated candidate details and promises.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Basic email validation
      if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();

      // Add all form fields except promises array
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'promises' && value && (typeof value === 'string' || value instanceof File)) {
          formDataToSend.append(key, value);
        }
      });

      // Add promises array
      formData.promises.forEach((promise) => {
        formDataToSend.append('promise[]', promise);
      });

      await api.patch(`${server}/candidates/candidate-list/${candidateId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setToastMessage('Candidate updated successfully');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Update Candidate Error:', err);
      setError(err.response?.data?.message || 'Failed to update candidate');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-[#0099ff] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-[#1a1a1a] text-white overflow-y-auto">
      <div className="container mx-auto p-8 h-full">
        <form className="bg-[#121212] rounded-lg p-8 h-full flex flex-col" onSubmit={handleSubmit}>
          {error && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded shadow-lg z-50">
              {error}
            </div>
          )}
          {toastMessage && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded shadow-lg z-50">
              {toastMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                placeholder="Enter first name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                placeholder="Enter last name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                placeholder="example@domain.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">State</label>
              <select
                name="town"
                value={formData.town}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
              >
                <option value="">Select State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">Candidate Type</label>
              <select
                name="candidateType"
                value={formData.candidateType}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
              >
                <option value="">Select Type</option>
                <option value="new">New</option>
                <option value="existing">Existing</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300">Update Avatar</label>
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex-grow flex flex-col">
            <label className="text-gray-300 mb-2">Promises</label>

            {/* Promises Input Section */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                name="promise"
                value={formData.promise}
                onChange={handleChange}
                placeholder="Enter a new promise"
                className="flex-grow bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
              />
              <button
                type="button"
                onClick={handlePromiseAdd}
                className="px-4 py-2 bg-[#5800FF] text-white rounded-lg hover:bg-[#4600cc] transition-colors"
              >
                Add Promise
              </button>
            </div>

            {/* Promises List Section */}
            <div className="flex-grow bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 mb-6 overflow-y-auto max-h-[300px]">
              {formData.promises.length === 0 ? (
                <p className="text-gray-500">No promises added yet</p>
              ) : (
                <div className="space-y-2">
                  {formData.promises.map((promise, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-lg"
                    >
                      <span className="text-white">{promise}</span>
                      <button
                        type="button"
                        onClick={() => handlePromiseDelete(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#5800FF] text-white rounded-lg hover:bg-[#4600cc] transition-colors"
            >
              Update Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCandidateForm;