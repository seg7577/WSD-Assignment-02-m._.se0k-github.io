import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // AuthContext에서 인증 상태 가져오기

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
