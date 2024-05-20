import { isExpired } from "react-jwt";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tokenAuth');
    const expired = isExpired(token);
    if (expired) {
      localStorage.clear();
      navigate('/login');
    }
}, [navigate])

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
    </div>
  );
};

export default Home;