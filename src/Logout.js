import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any authentication tokens or user data here
    // For example, localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to the login page
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
