import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

function Login() {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userType = searchParams.get("userType");
  const Email = searchParams.get("Email");

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const RESENDOTP = async () => {
    console.log("Email Sent SuccessFully:", Email);
    var response;
    if (userType === "freelancer") {
      response = await axios.post(
        "http://127.0.0.1:5000/freelancer/resendOTP",
        { Email }
      );
    } else {
      response = await axios.post("http://127.0.0.1:5000/client/resendOTP", {
        Email,
      });
    }
    Swal.fire("OTP Sent Successfully!", "", "success");
  };

  const handleInputChange = (index, value) => {
    switch (index) {
      case 0:
        setCode1(value.toUpperCase());
        break;
      case 1:
        setCode2(value.toUpperCase());
        break;
      case 2:
        setCode3(value.toUpperCase());
        break;
      case 3:
        setCode4(value.toUpperCase());
        break;
      default:
        break;
    }

    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    let response;
    const verificationCode = code1 + code2 + code3 + code4;
    console.log("verification Code is:", verificationCode);

    if (verificationCode.length !== 4) {
      Swal.fire("Please input in Proper Format");
      e.preventDefault();
      return;
    }

    try {
      e.preventDefault();
      // const email = Email;
      if (userType === "freelancer") {
        response = await axios.post("http://127.0.0.1:5000/freelancer/verify", {
          verificationCode,
          Email,
        });
        console.log(response);
      } else {
        response = await axios.post("http://127.0.0.1:5000/client/verify", {
          verificationCode,
          Email,
        });
        console.log(response);
      }

      if (response.status === 200) {
        console.log("---------------------------------");
        console.log(response.status);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account Created SuccessFully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      } else if (response.status === 400) {
        console.log("---------------------------------");
        console.log(response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      console.log(error.response.status);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Incorrect Code",
          html: "Please Insert Correct Code",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          html: "Error While Verifying.",
        });
      }
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {Email}</p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              {[code1, code2, code3, code4].map((code, index) => (
                <div className="w-16 h-16" key={index}>
                  <input
                    ref={inputRefs[index]}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    value={code}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <button
                  class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  onClick={handleSubmit}
                >
                  Verify Account
                </button>
              </div>

              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  class="flex flex-row items-center  hover:text-purple-500 text-blue-600 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={RESENDOTP}
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
