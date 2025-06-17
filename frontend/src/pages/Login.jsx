import React, { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', { email, password });

      const token = res.data.token;
      // Decode token (without verifying, just extracting payload)
      const payload = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login successful');
      navigate('/dashboard');


    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <input className="border p-2 rounded" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input className="border p-2 rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition" type="submit">Login</button>
        <p className="text-center mt-2">
          New here? <a href="/signup" className="text-blue-600 underline">Signup</a>
        </p>
        <p className="text-center mt-1">
          <a href="/forgot-password" className="text-blue-600 underline">Forgot password?</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
