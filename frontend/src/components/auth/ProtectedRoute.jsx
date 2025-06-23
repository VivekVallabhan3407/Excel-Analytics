<<<<<<< HEAD
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  
  return children;
};

export default ProtectedRoute;
=======
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, adminOnly = false }) {
  const userData = localStorage.getItem('user'); 

  const user = userData ? JSON.parse(userData) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
>>>>>>> 0fe5ad0 (Recoverd from broken main branch)
