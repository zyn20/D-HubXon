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
        return "Username must start with a letter, be 3-15 characters long, and can include letters, numbers, underscores, and hyphens.";
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

  const validations = () => {
    let valid = true;
    if (signupState['password'] !== signupState['confirm-password']) {
      Swal.fire('Password and Confirm Password do not match!');
      valid = false;
    }

    if (!userType) {
      Swal.fire('Please select a user type (Client/Freelancer)!');
      valid = false;
    }
    return valid;
  };

  const createAccount = async () => {
    const name = signupState['username'];
    const email = signupState['email-address'];
    const pass = signupState['password'];

    try {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      });

      const endpoint = userType === "freelancer" ? 'freelancer/signUp' : 'client/signUp';
      await axios.post(`http://127.0.0.1:5000/${endpoint}`, { name, email, pass });

      Swal.fire('Verification code has been sent!')
        .then(() => {
          navigate(`/verify?userType=${userType}`);
        });
    } catch (error) {
      Swal.fire('Please Enter a Valid email');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validations()) {
      createAccount();
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
