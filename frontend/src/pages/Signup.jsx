import React, { useState } from 'react';
import axios from '../services/axios';

function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'user', phone: '', dob: ''
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[6-9]\d{9}$/; // For Indian numbers

    if (!phoneRegex.test(formData.phone)) {
      alert("Enter a valid 10-digit Indian phone number");
      return;
    }

    try {
      await axios.post('/register', formData); // NOT /api/register
      alert('Registered successfully');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <input className="border p-2 rounded" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="border p-2 rounded" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="border p-2 rounded" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select className="border p-2 rounded" name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input className="border p-2 rounded" name="phone" pattern="[6-9]{1}[0-9]{9}"
          title="Enter a valid 10-digit Indian number" placeholder="Phone" onChange={handleChange} required />
        <input className="border p-2 rounded" type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition" type="submit">Sign Up</button>
        <p className="text-center mt-2">
          Already have an account? <a href="/login" className="text-blue-600 underline">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
