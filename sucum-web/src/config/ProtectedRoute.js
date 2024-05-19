import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('tokenAuth');
      if (!token) {
        navigate('/login');
      }
    }, [navigate]);
  
    return children;
};