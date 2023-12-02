import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import Swal from 'sweetalert2'



const fields = loginFields;
let fieldsState = {};
fields.forEach(field => (fieldsState[field.id] = ''));

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();


  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authenticateUser(loginState);
      console.log(response.data); // Log the API response
      // Handle successful login, redirection, etc.
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      // Handle login error (display error message, etc.)
    }
  };

  // Handle Login API Integration here
  const authenticateUser = async (userData) => {
    try {
      const apiUrl = 'http://127.0.0.1:5000/freelancer/signIn'; // Update with your API endpoint
      const response = await axios.post(apiUrl, {
        email: userData['email-address'], // Assuming your field ID is 'email-address'
        pass: userData['password'] // Assuming your field ID is 'password'
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

   

    
    

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit}    text="Login"/>

      </form>
    )
}
