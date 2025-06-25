import React, { useState } from 'react';
import axios from '../services/axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/forgot-password', { email });
      setMsg('Reset link sent! Check your email.');
    } catch {
      setMsg('Error sending reset link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <input className="border p-2 rounded" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition" type="submit">Send Reset Link</button>
        {msg && <p className="text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;