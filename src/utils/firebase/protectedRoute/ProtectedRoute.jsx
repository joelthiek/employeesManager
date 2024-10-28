import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return currUser ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
