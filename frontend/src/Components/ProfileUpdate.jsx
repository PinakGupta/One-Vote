import '../Styles/ProfileUpdate.css';
import { useSelector } from 'react-redux';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import api from '../axiosInstance';
import { serverWithId } from '../server';

/**
 * ProfileUpdate component for updating user profile details.
 * Allows updating firstName, lastName, email, and avatar.
 * Displays isVoted status (read-only) and provides navigation.
 */
function ProfileUpdate() {
  const { userData, visitorType } = useContext(userContext);
  const [data, setData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userValues.userId);

  // Initialize form data from user context
  useEffect(() => {
    setData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
    });
  }, [userData]);

  /**
   * Handle input changes for text fields and file uploads.
   * Updates state and avatar preview for file inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      const file = files[0];
      setData((prev) => ({ ...prev, [name]: file }));
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Handle form submission to update user profile.
   * Validates email and sends patch request with FormData.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic email validation
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
        setErr('Please enter a valid email address');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const formData = new FormData();
      if (data.firstName) formData.append('firstName', data.firstName);
      if (data.lastName) formData.append('lastName', data.lastName);
      if (data.email) formData.append('email', data.email);
      if (data.avatar) formData.append('avatar', data.avatar);

      await api.patch(`${serverWithId}/${userId}/api/v1/user/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Profile updated successfully');
      navigate(`/${userId}/api/v1/user/profile`);
    } catch (error) {
      console.error('Profile Update Error:', error);
      setErr(error.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  // Clear error/success messages after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setErr('');
      setSuccess('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [err, success]);

  // Check if any field has a value for enabling submit button
  const isFormValid = data.firstName || data.lastName || data.email || data.avatar;

  return (
    <>
      {err && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>{err}</p>
        </div>
      )}
      {success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg z-50">
          <p>{success}</p>
        </div>
      )}

      <div className="formSection mt-10">
        <div className="form-headings">
          <p className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-left">
            Update Profile
          </p>
        </div>

        <form className="flex" onSubmit={handleSubmit}>
          <div className="allEnteries w-full sm:w-[50%] flex flex-col gap-10 justify-between">
            <div className="header flex gap-10">
              {avatarPreview ? (
                <img src={avatarPreview} alt="User Avatar" className="avatar object-cover" />
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkVto1t4ROcxcqi0SrFtgSQQJ1Aau0ad1d3g&s"
                  alt="No Avatar"
                  className="avatar"
                />
              )}
              <Button
                innerText="Update Avatar"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <input
                type="file"
                name="avatar"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
            </div>
            <div className="formData flex flex-col gap-10">
              <div className="ele firstName flex flex-col gap-3">
                <label htmlFor="firstName" className="text-lg lg:text-xl xl:text-2xl">
                  First Name
                </label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  placeholder="Enter first name"
                />
              </div>
              <div className="ele lastName flex flex-col gap-3">
                <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">
                  Last Name
                </label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  placeholder="Enter last name"
                />
              </div>
              <div className="ele email flex flex-col gap-3">
                <label htmlFor="email" className="text-lg lg:text-xl xl:text-2xl">
                  Email Address
                </label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="example@domain.com"
                />
              </div>
              <div className="ele isVoted flex flex-col gap-3">
                <label htmlFor="isVoted" className="text-lg lg:text-xl xl:text-2xl">
                  Voted:
                </label>
                <input
                  className="text-lg lg:text-xl xl:text-2xl"
                  type="text"
                  name="isVoted"
                  id="isVoted"
                  value={userData.isVoted ? 'Yes' : 'No'}
                  disabled
                />
              </div>

              <div className="button flex gap-6">
                <button
                  type="button"
                  id="back"
                  className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
                >
                  <Link to={`/${userId}`} state={visitorType}>
                    <span>&lt; Back</span>
                  </Link>
                </button>
                <button
                  type="submit"
                  id="button"
                  className={`text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24 ${
                    !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!isFormValid}
                >
                  <span>Submit</span>
                </button>
                <button
                  type="button"
                  id="button"
                  className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"
                >
                  <Link to="password" state={visitorType}>
                    <span>Update Password</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileUpdate;