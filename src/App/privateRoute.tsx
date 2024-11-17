import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth(); // AuthContext에서 인증 상태 가져오기
  return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
