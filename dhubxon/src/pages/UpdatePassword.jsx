import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "animate.css";


function UpdatePassword() {
    const [Pass1,Setpass1]=useState('');
    const [Pass2,Setpass2]=useState('');
    var response;
    const navigate=useNavigate();
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get("userType");
  const email = searchParams.get("email");
    const validation=(pass1,pass2)=>{
if(pass1!=pass2){
  Swal.fire({
    title: "Password Not Match",
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
  console.log("password Not match");return false;
}
return true;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!validation(Pass1, Pass2)) {
          return;
        }
      
        const password = Pass1;
        console.log("Password Match");
      
        try {
          let response;
      
          if (userType === "freelancer") {
            console.log("I am in freelancer userType");
            response = await axios.post('http://127.0.0.1:5000/freelancer/updatepassword', { email, password });
            if (response.status === 200) {
              Swal.fire("Freelancer Password has been changed");
            }
          } else if (userType === "client") {
            console.log("I am in Client userType");
            response = await axios.post('http://127.0.0.1:5000/client/updatepassword', { email, password });
            if (response.status === 200) {
              Swal.fire("Client Password has been changed");
            }
          }
      
          if (response && response.status === 200) {
            // Remove the token from localStorage
localStorage.removeItem('token');
console.log("Token has been Removed");
            Swal.fire("Password has been changed");
            navigate("/login");
          }
      
        } catch (error) {
          console.error("An error occurred:", error);
        }
      };
      









  return (
    <div>
      <div class="bg-[#DBEAFE] dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
    <div class="bg-[#7E22CE] shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
        <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
      </svg>
    </div>
    <form class="p-12 md:p-24">
      <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" id="username" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"  value={Pass1} onChange={(e)=>{Setpass1(e.target.value)}}  placeholder="Enter Your Password" />
      </div>
      <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" id="password" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"  value={Pass2} onChange={(e)=>{Setpass2(e.target.value)}}  placeholder="Confirm Your Password" />
      </div>
      <button class="bg-[#7E22CE] font-medium p-2 md:p-4 text-white uppercase w-full rounded"   onClick={handleSubmit}>Login</button>
    </form>
  </div>
 </div>
    </div>
  )
}

export default UpdatePassword
