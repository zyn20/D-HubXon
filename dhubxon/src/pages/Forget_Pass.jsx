import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Forget_Pass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  var userType;

  const isEmailValid = () => {
    console.log("I am in Email Regix Verification");
    // Use a regular expression to validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    if (!isEmailValid()) {
      Swal.fire(
        "Invalid Email Format",
        "Please enter a valid email address",
        "error"
      );
      e.preventDefault();
    }

    else{
    const Email = email;
    e.preventDefault();

    try {
      console.log(email);
      const response = await axios.post(
        "http://127.0.0.1:5000/forgetpassword",
        { Email }
      );
      console.log("Response Is:", response);
      if (response.status === 200) {
        userType = response.data.userType;
        console.log("Response DataType:", userType);

        if (userType === "freelancer") {
          console.log("i am in freelancer usertype");

          try {
            const response = await axios.post(
              "http://127.0.0.1:5000/freelancer/forgetpassword",
              { email }
            );
          } catch (error) {
            console.error("An error occurred:", error);
            // return;
          }
        } else if (userType === "client") {
          console.log("i am in Client usertype");
          try {
            const response = await axios.post(
              "http://127.0.0.1:5000/client/forgetpassword",
              { email }
            );
          } catch (error) {
            console.error("An error occurred:", error);
            // return;
          }
        }

        Swal.fire("OTP SENT SUCESSFULLY!", "", "success");
        navigate(`/verify_forgetOTP?userType=${userType}&email=${email}`);
      }

      // Handle the response or perform any other actions here
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire("user Not Found");
      // Handle the error, show a message, or perform any other error-related actions
    }
  }
  };

  return (
    <div>
      <div class="bg-[#DBEAFE] dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
        <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
          <div class="bg-[#7E22CE] absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </div>
          <form class="p-12 md:p-24">
            <div class="flex items-center text-lg mb-6 md:mb-8">
              <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
              <input
                type="text"
                required
                id="username"
                class="bg-[#E8EAED] rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <button
              class="bg-[#7E22CE] font-medium p-2 md:p-4 text-white uppercase w-full rounded"
              onClick={handleSubmit}
            >
              {" "}
              VERIFY
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forget_Pass;
