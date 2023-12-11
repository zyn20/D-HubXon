import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { all } from 'axios';

function Protected({ component: Component,allowableuser }) {
  console.log('I am in protected.js');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    

    // Optionally, you can check the validity of the token here
    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      console.log('User Role:', userRole);
      console.log("allowable",allowableuser)
      if(userRole!=allowableuser){
        if(userRole==="client"){navigate("/client/")}
        if(userRole==="freelancer"){navigate("/freelancer/")}
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      navigate('/login');
    }
  }, [navigate]);

  return Component ;
}

export default Protected;
