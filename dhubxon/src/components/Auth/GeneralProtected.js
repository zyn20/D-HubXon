import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

function Protected({ component: Component }) {
  console.log('I am in General protected.js');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token is:",token);
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        console.log("Role is:",userRole);
        console.log("decoded Token is:",decodedToken);
        if (userRole !== 'All') {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    }
  }, [navigate]);

  return Component ;
}

export default Protected;
