import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { email, password });
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
    } catch {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <input className="border p-2" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input className="border p-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <button className="bg-green-500 text-white p-2 rounded" type="submit">Login</button>
    </form>
  );
}

export default Login;
