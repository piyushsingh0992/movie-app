import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from './Loading';

interface PrivateRouteProps {
  roles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading indicator or spinner while loading
    return <LoadingScreen />;
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Role not authorized, redirect to home page
    return <Navigate to="/" />;
  }

  // Authorized, return child components
  return <Outlet />;
};

export default PrivateRoute;
