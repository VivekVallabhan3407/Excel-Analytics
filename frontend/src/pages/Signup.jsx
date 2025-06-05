import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('/api/register', formData);
      alert('Registered successfully');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <input className="border p-2" name="name" placeholder="Name" onChange={handleChange} required />
      <input className="border p-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input className="border p-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
      
      <select className="border p-2" name="role" onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input className="border p-2" name="phone"  pattern="[6-9]{1}[0-9]{9}"
  title="Enter a valid 10-digit Indian number" placeholder="Phone" onChange={handleChange} required />
      <input className="border p-2" type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} required />

      <button className="bg-blue-500 text-white p-2 rounded" type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
