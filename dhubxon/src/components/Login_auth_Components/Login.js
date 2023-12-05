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
                Swal.fire("Sign in Successfully!");
                navigate('/jobview');
                return;
            }
        } catch (clientError) {
            console.error("Client Authentication Error:", clientError);
        }
    
        // If client login fails, try freelancer login
        try {
            const freelancerResponse = await axios.post('http://127.0.0.1:5000/freelancer/signIn', { email, pass });
    
            if (freelancerResponse.status === 200) {
                console.log("Freelancer Sign-in successful!");
                Swal.fire("Sign in Successfully!");
                navigate('/freelancerdashboard');
                return;
            }
        } catch (freelancerError) {
            console.error("Freelancer Authentication Error:", freelancerError);
        }
    
        // If both client and freelancer login fail
        Swal.fire({
            icon: "error",  
            title: "Oops...",
            text: "User Not Found!",
            footer: <a href="/signup">Create a new account</a>,
        });
        navigate('/login');
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
