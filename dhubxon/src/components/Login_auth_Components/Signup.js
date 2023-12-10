import { useState } from 'react';
import axios from 'axios';
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();        

  // Initialize fieldsState
  let fieldsState = {};
  signupFields.forEach(field => fieldsState[field.id] = '');

  const [signupState, setSignupState] = useState(fieldsState);
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});

  // Function to get specific error message
  const getErrorMessage = (id, value) => {
    switch(id) {
      case 'username':
        return "Username must be 3-15 characters and can include letters, numbers, underscores, and hyphens.";
      case 'email-address':
        return "Invalid email format.";
      case 'password':
        return "Password must be at least 8 characters and include uppercase, lowercase, and numbers.";
      case 'confirm-password':
        return "Passwords do not match.";
      default:
        return "Invalid input.";
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignupState({ ...signupState, [id]: value });

    // Validation logic
    const fieldValidation = signupFields.find(field => field.id === id)?.pattern;
    if (fieldValidation && !new RegExp(fieldValidation).test(value)) {
        setErrors({...errors, [id]: getErrorMessage(id, value)});
    } else {
        const newErrors = {...errors};
        delete newErrors[id];
        setErrors(newErrors);
    }
  };

  const handleUserTypeChange = (e) => setUserType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState);

  if(!validations())
   {  
   e.preventDefault();
  }else{
    createAccount();
  }
  // createAccount();
  }

  // Handle validations  here

  const validations=()=>{


    console.log("i am in validations");
    console.log(signupState['password']);
    console.log(signupState['confirm-password']);
    if (signupState['password'] !== signupState['confirm-password']) {
      console.log("han Nh Equal");
      Swal.fire('Password and Confirm Password do not match!');
      return false;
    }

    if (!userType) {
      Swal.fire('Please select a user type (Client/Freelancer)!');
      return false;
    }
    return true;
  }

  // Handle Signup API Integration here
  const createAccount = async () => {
    const Name = signupState['username'];
    const Email = signupState['email-address'];
    const Pass = signupState['password'];
  
    console.log("Name:", Name);
    console.log("Email:", Email);
    console.log("Password:", Pass);
    console.log("User Type:", userType);
  
    try {
        let timerInterval;
        Swal.fire({
          title: "Sending OTP...",
          html: " <b></b> Please wait while we send the verification code to your email",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("OTP sent successfully");
          }
        });
  
      let response;
  
      if (userType === "freelancer") {
        response = await axios.post('http://127.0.0.1:5000/freelancer/signUp', { Name, Email, Pass });
      } else {
        response = await axios.post('http://127.0.0.1:5000/client/signUp', { Name, Email, Pass });
      }
  
      Swal.fire("OTP Sent Successfully!", "", "success").then(() => {
        navigate(`/verify?userType=${userType}&Email=${Email}`);
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Email Already Exist',
          html: 'Please Input Another Email and ',
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
      } else {
        // Handle other errors if needed
        console.error("An error occurred:", error);
        Swal.fire('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {signupFields.map(field => (
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
              error={errors[field.id]}
          />
        ))}

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
  );
}
