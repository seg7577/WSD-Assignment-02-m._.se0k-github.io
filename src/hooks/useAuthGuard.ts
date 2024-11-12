import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthGuard = (isAuthenticated: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthGuard;
