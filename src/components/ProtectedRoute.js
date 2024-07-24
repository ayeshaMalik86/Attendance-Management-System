import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/user-login" />;
  }
  return <Component {...rest} />;
};

export default ProtectedRoute;
