import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { all } from 'axios';

function Protected({ component: Component,allowableuser }) {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');



    if (!token || typeof token != 'string') {
      navigate('/login');
    }

    console.log("Token Type:",typeof token)

  
    try {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
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
