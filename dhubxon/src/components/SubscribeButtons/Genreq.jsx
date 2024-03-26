import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Genreq = () => {
  // State to store the fetched data
  const [requestData, setRequestData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/validator/fetch-Dispute-requests"
      );
      setRequestData(response.data); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleclientbutton = () => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are sure to Favour Client. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add verification logic here
        // For demonstration, showing a success message
        Swal.fire("Success!", `The request has been Verified.`, "success");
        console.log("Request verified");
      }
    });
  };

  const handlefreelancerbutton = () => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are sure to Favour Freelancer. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Add rejection logic here
        // For demonstration, showing a success message
        Swal.fire("Success!", `The request has been Verified.`, "success");
        console.log("Request rejected");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    

      <section className="bg-white py-20 lg:py-[120px]">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-center bg-blue-900 text-white">
                      <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Category</th>
                      <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Detail</th>
                      <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Email</th>
                      <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Legal Documents</th>
                      <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Proposal</th>
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
                          {request.Category}
                        </td>
                        <td className="py-5 px-2 bg-white">
                          {request.COVERLETTER}
                        </td>
                        <td className="py-5 px-2 bg-[#F3F6FF]">
                          {request.DISPUTEREQUESTOWNER}
                        </td>
                        <td className="py-5 px-2 bg-white">
                          <button onClick={() => window.open(request.FILEURL, '_blank')} style={{ display: 'block', margin: 'auto' }}>View Documents</button>
                        </td>
                        <td className="py-5 px-2 bg-[#F3F6FF]">
                          <button onClick={() => window.open(request.PROPOSALFILEURL, '_blank')} style={{ display: 'block', margin: 'auto' }}>View More Details</button>
                        </td>
                        <td className="py-5 px-2 bg-white">
                          <button onClick={handleclientbutton} style={{ display: 'block', margin: 'auto' }}>Client</button>
                          <button  onClick={handlefreelancerbutton} style={{ display: 'block', margin: 'auto' }}>Freelancer</button>
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

export default Genreq;
