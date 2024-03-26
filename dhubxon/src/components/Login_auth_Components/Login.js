import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import Swal from 'sweetalert2';
import 'animate.css';
import { jwtDecode } from "jwt-decode";



const fields = loginFields;
const initialLoginState = fields.reduce((acc, field) => {
  acc[field.id] = '';
  return acc;
}, {});

export default function Login() {
  const [loginState, setLoginState] = useState(initialLoginState);
  const navigate = useNavigate();


    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }


const authenticateUser = async () => {
    const email = loginState['email-address'];
    const pass = loginState['password'];
  
    try {
      const clientResponse = await axios.post('http://127.0.0.1:5000/client/signIn', { email, pass });
  
      if (clientResponse.status === 200) {
        console.log("Client Sign-in successful!");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login In Successfully",
          showConfirmButton: false,
          timer: 1500
        });
  

        localStorage.setItem('token', clientResponse.data.token);
        console.log(clientResponse);
        console.log(clientResponse.data.token);
  
        navigate('/client/');
        return;
      }
    } catch (clientError) {
      console.error("Client Authentication Error:", clientError);
    }

    try {
      const validatorResponse = await axios.post('http://localhost:5000/validator/signin', { email, pass });
    
      if (validatorResponse.status === 200) {
        console.log("Validator Sign-in successful!");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login In Successfully",
          showConfirmButton: false,
          timer: 1500
        });
    
        localStorage.setItem('token', validatorResponse.data.token);
        console.log(validatorResponse);
        console.log(validatorResponse.data.token);
    
       
         navigate('/validator/');
        return;
      }
    } catch (validatorError) {
      console.error("Validator Authentication Error:", validatorError);
    }
    
    try {
      const freelancerResponse = await axios.post('http://127.0.0.1:5000/freelancer/signIn', { email, pass });
  
      if (freelancerResponse.status === 200) {
        console.log("Freelancer Sign-in successful!");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login In Successfully",
          showConfirmButton: false,
          timer: 1500
        });
  
        localStorage.setItem('token', freelancerResponse.data.token);
  
        const token = localStorage.getItem('token');

        const decodedToken = jwtDecode(token);
  
        const userRole = decodedToken.role;
        console.log(userRole);
  
        navigate('/freelancer/');
        return;
      }
    } catch (freelancerError) {
      console.error("Freelancer Authentication Error:", freelancerError);
    }
  
    // If both client and freelancer login fail
    Swal.fire({
      icon: 'error',
      title: 'User Not Found',
      html: 'Please Input Correct Email and Password',
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  
    
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

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
