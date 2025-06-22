// components/auth/RequireAdmin.jsx
import { useAuth } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ children }) {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}