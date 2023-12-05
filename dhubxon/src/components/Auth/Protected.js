import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Protected({ component: Component }) {
  console.log('i am in protected.js');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log(userRole);
    } catch (error) {
      console.error('Invalid token specified: must be a string');
      navigate('/login');
    }
  }, [navigate]); // Include navigate in the dependency array

  return Component;
}

export default Protected;
