import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { token, password });
      setMsg('Password reset! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setMsg('Reset failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <input className="border p-2 rounded" type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition" type="submit">Reset Password</button>
        {msg && <p className="text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;