

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HealthReq = () => {
  const [requestData, setRequestData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/validator/fetch-requests"
      );
      setRequestData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetails = (email) => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to view more details. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, view details",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/validator/view-complete-details/${email}`);
      }
    });
  };

  const handleVerify = () => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to verify this request. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, verify",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add verification logic here
        // For demonstration, showing a success message
        Swal.fire("Verified!", "The request has been verified.", "success");
        console.log("Request verified");
      }
    });
  };

  const handleReject = () => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this request. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add rejection logic here
        // For demonstration, showing a success message
        Swal.fire("Rejected!", "The request has been rejected.", "error");
        console.log("Request rejected");
      }
    });
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <h1 className="text-3xl lg:text-5xl font-bold text-center mb-10">
              <span className="inline-block mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 inline-block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11 3a1 1 0 0 1 1 1v1h4a1 1 0 0 1 0 2h-1v1a1 1 0 1 1-2 0V7H9v3a1 1 0 1 1-2 0V6H6V5a1 1 0 0 1 1-1h4zm2 7h-4v1h4a1 1 0 0 0 0-2zM7 15h6v1H7a1 1 0 0 1-1-1v-3h2v2a1 1 0 0 0 2 0v-2h2v3a1 1 0 0 1-1 1H7z" clipRule="evenodd" />
                </svg>
              </span>
              Health Care Requests Menu
            </h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-center bg-blue-900 text-white">
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Name</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Picture as per CNIC</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Email</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Legal Documents</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">More Details</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((request, index) => (
                    <tr
                      key={index}
                      className="text-center text-dark font-medium text-base"
                    >
                      <td className="py-5 px-2 bg-[#F3F6FF]">
                        {request.FULLNAME}
                      </td>
                      <td className="py-5 px-2 bg-white">
                        <a
                          href={request.PROFILEURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Picture
                        </a>
                      </td>
                      <td className="py-5 px-2 bg-[#F3F6FF]">
                        {request.EMAIL}
                      </td>
                      <td className="py-5 px-2 bg-white">
                        <button onClick={() => window.open(request.FILEURL, '_blank')} style={{ display: 'block', margin: 'auto' }}>View Documents</button>
                      </td>
                      <td className="py-5 px-2 bg-[#F3F6FF]">
                        <button onClick={() => handleViewDetails(request.EMAIL)} style={{ display: 'block', margin: 'auto' }}>View More Details</button>
                      </td>
                      <td className="py-5 px-2 bg-white">
                        <button onClick={handleVerify} style={{ display: 'block', margin: 'auto' }}>Verify</button>
                        <button onClick={handleReject} style={{ display: 'block', margin: 'auto' }}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
);

};

export default HealthReq;
