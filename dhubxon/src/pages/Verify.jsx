import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


function Login() {
    const [code, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get('userType');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

    

  const handleSubmit = async (e) => {

    if (code === '') {
      Swal.fire("Please Enter Code");
      
      return;
    }
  
    try {
      e.preventDefault();
  
      let response;
  
      if (userType === "freelancer") {
        response = await axios.post('http://127.0.0.1:5000/freelancer/verify', { code });
      } else {
        response = await axios.post('http://127.0.0.1:5000/client/verify', { code });
      }
  
      console.log(response);
  
      if (response.status === 200) {
        console.log("---------------------------------");
        console.log(response.data);
        navigate('/');
      } else {
        // Handle other status codes if needed
        Swal.fire({
          icon: 'error',
          title: 'Incorrect Code',
          html: "Please Insert Correct Code",
        });
      }
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error("An error occurred:", error);
  
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: "Incorrect Code.",
      });
    }
  };
  

  return (
    <div>
      <div class="bg-[#DBEAFE] dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div class="bg-[#FFFFFF] lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
    <div class="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
      </svg>
    </div>
    <form class="p-12 md:p-24" action=''>
      <div class="flex items-center text-lg mb-6 md:mb-8">
      <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input  name='name' type="text" id="username" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Enter Code Here" value={code} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      
      <button class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded" onClick={handleSubmit}>Submit</button>
    </form>
  </div>
 </div>
    </div>
  )
}

export default Login
