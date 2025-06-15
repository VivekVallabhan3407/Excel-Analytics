import React from 'react';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Excel Analytics</h1>
      <Link to="/signup" className="mr-4 text-blue-600 underline">Sign Up</Link>
      <Link to="/login" className="text-blue-600 underline">Login</Link>
    </div>
  );
}

export default Home;