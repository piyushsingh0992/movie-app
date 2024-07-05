import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in so redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Role not authorised so redirect to home page
    return <Navigate to="/" />;
  }

  // Authorised so return child components
  return <Outlet />;
};

export default PrivateRoute;
