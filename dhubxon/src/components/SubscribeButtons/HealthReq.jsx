

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import abi from "../../contract/SubscriptionContract.json";
import { ethers } from "ethers";

const HealthReq = () => {
  const [requestData, setRequestData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State variable for loading screen
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  // const navigate = useNavigate();



  useEffect(() => {
    fetchData();


    connectmetamask();
    const template = async () => {
      const contractAddress = "0x3DfA46F34FA85ec64B7AAc624B232b5D32104F29";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        ethereum.on("accountsChanged", (accounts) => {
          const selectedAddress = accounts[0];
          setmetamaskAddress(
            selectedAddress ? `Connected: ${selectedAddress}` : "Not Connected"
          );

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
          //   setContract(state.contract);

          console.log("useeffect Contract Data is:", state);
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setState({ provider, signer, contract });
        // setContract(state.contract);

        console.log("useeffect Contract Data is:", state);
      } catch (error) {
        console.log(error);
      }
    };

    template();


  }, []); 


  const connectmetamask = () => {
    if (window.ethereum) {
      if (!isChecked) {
        try {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
              const selectedAddress = accounts[0];
              setmetamaskAddress(`Connected:${selectedAddress}`);

              setIsChecked(true);
            })
            .catch((error) => {
              console.error("MetaMask account access denied:", error);
            });
        } catch (error) {
          console.error("Error accessing MetaMask account:", error);
        }
      } else {
        setIsChecked(false);
      }
    } else {
      setIsChecked(false);

      Swal.fire({
        title: "Error!",
        text: "MetaMask is not available. Please install MetaMask to For Subscription.",
        icon: "error",
      });
    }
  };

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

;

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

  const handleVerify = async (useremail, id) => {
    setIsLoading(true)
    try {
      // Fetch project details by user email
      const projectDetailResponse = await axios.get(
        'http://127.0.0.1:5000/freelancer/subscriptionbyemail',
        {
          params: {
            useremail
          }
        }
      );
  
      // Extract relevant data from the response
      const { deductionAmount, BLOCKCHAININDEX } = projectDetailResponse.data;
      const amount = deductionAmount / 3076;
      const projectIdInt = parseInt(BLOCKCHAININDEX);
      const priceeINETHER = ethers.utils.parseEther(amount.toString());
  
      // Call smart contract method to claim subscription
      const tx = await state.contract.claimSubscription(
        projectIdInt,
        { value: priceeINETHER }
      );
      await tx.wait();
      setIsLoading(false)

      // Show confirmation dialog before proceeding
      const confirmationResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to verify this request. Proceed?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, verify',
        cancelButtonText: 'Cancel',
      });
  
      if (confirmationResult.isConfirmed) {
        // Update claim request status
        await axios.post(
          'http://127.0.0.1:5000/freelancer/updateclaim',
          { ID: id }
        );
  
        // Show success message after verification
        Swal.fire('Verified!', 'The request has been verified.', 'success');
        window.location.reload();
        console.log('Request verified');
      } else {
        // Handle cancellation
        console.log('Verification cancelled');
      }
    } catch (error) {
      console.error('Error handling verification:', error);
      // Handle errors gracefully
      Swal.fire('Error', 'An error occurred while handling verification.', 'error');
    }
  };

  const handleReject = (id) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Add rejection logic here
          await axios.post(
            'http://127.0.0.1:5000/freelancer/updateclaim',
            { ID: id }
          );
          // For demonstration, showing a success message
          Swal.fire("Rejected!", "The request has been rejected.", "error");
          console.log("Request rejected");
          window.location.reload();
        } catch (error) {
          // Handle error
          console.error("Error rejecting request:", error);
          Swal.fire("Error", "Failed to reject the request.", "error");
        }
      }
    });
  };
  

  return (
    <section className="bg-white py-20 lg:py-[120px]">
        {isLoading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        )}
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
                        <button onClick={()=>handleVerify(request.EMAIL,request.id)} style={{ display: 'block', margin: 'auto' }}>Verify</button>
                        <button onClick={()=>handleReject(request.id)} style={{ display: 'block', margin: 'auto' }}>Reject</button>
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
