

import { useState } from 'react';
import axios from 'axios'
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const fields = signupFields;
let fieldsState = {};


fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const navigate = useNavigate();

  const [signupState, setSignupState] = useState(fieldsState);
  const [userType, setUserType] = useState(''); // State to track selected user type

  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });
  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);

   validations();
    createAccount();
  }

  // Handle validations  here

  const validations=()=>{
    if (signupState['password'] !== signupState['confirm-password']) {
      Swal.fire('Password and Confirm Password do not match!');
      return;
    }

    if (!userType) {
      Swal.fire('Please select a user type (Client/Freelancer)!');
      return;
    }
  }

  // Handle Signup API Integration here
  const createAccount = async() => {


    const name = signupState['username'];
    const email = signupState['email-address'];
    const pass = signupState['password'];


    

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", pass);
    console.log("User Type:", userType);

     try {
      if(userType==="freelancer"){ 
       
         const clientResponse = await axios.post('http://127.0.0.1:5000/freelancer/signUp', { name,email, pass });}

           else{ const clientResponse = await axios.post('http://127.0.0.1:5000/client/signUp', { name,email, pass });}
          //  Swal.fire("Verification code has been send!");

          //  navigate(`/verify?userType=${userType}`);

          Swal.fire('Verification code has been sent!')
          .then(() => {
            navigate(`/verify?userType=${userType}`);
          });
     }catch(error){
      Swal.fire('Please Enter Valid email');
     }
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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

        <div className="flex items-center space-x-4">
          <input
            type="radio"
            id="client"
            name="user_type"
            value="client"
            checked={userType === 'client'}
            onChange={handleUserTypeChange}
          />
          <label htmlFor="client" className="cursor-pointer">Client</label>

          <input
            type="radio"
            id="freelancer"
            name="user_type"
            value="freelancer"
            checked={userType === 'freelancer'}
            onChange={handleUserTypeChange}
          />
          <label htmlFor="freelancer" className="cursor-pointer">Freelancer</label>
        </div>

        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}
