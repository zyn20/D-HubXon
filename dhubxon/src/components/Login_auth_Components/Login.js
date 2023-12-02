import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import Swal from 'sweetalert2';

const fields = loginFields;
const initialLoginState = fields.reduce((acc, field) => {
  acc[field.id] = '';
  return acc;
}, {});

export default function Login() {
  const [loginState, setLoginState] = useState(initialLoginState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  }

  const authenticateUser = async () => {
    const { email, password } = loginState;

    try {
      const [clientResponse, freelancerResponse] = await Promise.all([
        axios.post('http://127.0.0.1:5000/client/signIn', { email, password }),
        axios.post('http://127.0.0.1:5000/freelancer/signIn', { email, password }),
        
      ]);
      console.log(email,password);

      if (clientResponse.status === 200) {
        handleSuccessfulSignIn('Client Sign-in successful!', '/jobview');
      } else if (freelancerResponse.status === 200) {
        handleSuccessfulSignIn('Freelancer Sign-in successful!', '/freelancerdashboard');
      } else {
        handleSignInError('User Not Found!');
      }
    } catch (error) {
      handleSignInError(error);
    }
  };

  const handleSuccessfulSignIn = (message, redirectPath) => {
    console.log(message);
    Swal.fire("Sign in Successfully!");
    navigate(redirectPath);
  };

  const handleSignInError = (error) => {
    console.error("Error during authentication:", error);

    if (error.response) {
      console.error("Server responded with non-2xx status:", error.response.data);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("No response received from the server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User Not Found!",
      footer: <a href="/signup">Create a new account</a>,
    });
    navigate('/login');
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
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
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
