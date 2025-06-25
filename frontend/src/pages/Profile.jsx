import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [localUser, setLocalUser] = useState({ ...user });

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const handleChange = (e) => {
    setLocalUser({ ...localUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        localUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);         
      setEditMode(false);        
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="md:w-1/3 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mx-auto">
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </div>

            <FaEdit className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-blue-600" />
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => {
              setEditMode(!editMode);
              setLocalUser({ ...user }); // reset fields
            }}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
          </div>
        </div>

        {/* Right */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                name="name"
                value={localUser.name || ''}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={localUser.email || ''}
                disabled
                className="w-full px-4 py-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                name="phone"
                value={localUser.phone || ''}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {editMode && (
              <div className="mt-4 text-right">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
