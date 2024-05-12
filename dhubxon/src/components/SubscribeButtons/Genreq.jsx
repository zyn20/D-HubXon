import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import abi from "../../contract/FreelanceMarketplace.json";


const Genreq = () => {
  const navigate = useNavigate();
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
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



  const handleclientbutton = async (projectId) => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are sure to Favor Client. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Fetch project details from the server
          const projectDetailResponse = await axios.get(
            "http://127.0.0.1:5000/client/getprojectbyid",
            {
              params: {
                PROJECTID: projectId
              }
            }
          );
  
          // Parse the project ID to an integer
          const projectIdInt = parseInt(projectDetailResponse.data.BLOCKCHAININDEX);
  
          // Call the smart contract function to release payment to the freelancer
          const tx = await state.contract.releasePaymenttofreelancer(projectIdInt);
          await tx.wait();
  
          // Show success message
          Swal.fire("Success!", `The request has been Verified.`, "success");
          await axios.post('http://127.0.0.1:5000/client/complete-project', { projectId });

          // Reload the page
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          // Show error message
          Swal.fire("Error!", "An error occurred while processing your request.", "error");
        }
      }
    });
  };



  const handlefreelancerbutton = async (projectId) => {
    // Show confirmation dialog before proceeding
    Swal.fire({
      title: "Are you sure?",
      text: "You are sure to Favor Freelancer. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Fetch project details from the server
          const projectDetailResponse = await axios.get(
            "http://127.0.0.1:5000/client/getprojectbyid",
            {
              params: {
                PROJECTID: projectId
              }
            }
          );
  
          const budgetinINT=parseInt(projectDetailResponse.data.budget);
          const bugetInEther=budgetinINT/3076;
          const priceeINETHER = ethers.utils.parseEther(bugetInEther.toString());
      
          const ProjectID = parseInt(projectDetailResponse.data.BLOCKCHAININDEX); // Convert to int
          const tx = await state.contract.releasePayment(ProjectID, { value: priceeINETHER });
          await tx.wait();
  
          // Show success message
          Swal.fire("Success!", `The request has been Verified.`, "success");
          await axios.post('http://127.0.0.1:5000/client/complete-project', { projectId });

          // Reload the page
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          // Show error message
          Swal.fire("Error!", "An error occurred while processing your request.", "error");
        }
      }
    });
  };


  

//   const handlefreelancerbutton = (ProjectID) => {
//     // Show confirmation dialog before proceeding
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You are sure to Favour Freelancer. Proceed?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Add rejection logic here
//         // For demonstration, showing a success message
//         Swal.fire("Success!", `The request has been Verified.`, "success");
//         console.log("Request rejected");
//       }
//     });
//   };

 
  useEffect(() => {
    fetchData();

    connectmetamask();
    const template = async () => {
      const contractAddress = "0x446bAB9Ccc20E0A3Af7E15D59f5600Eb81649094";
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
        text: "MetaMask is not available. Please install MetaMask to ADD Project.",
        icon: "error",
      });
      navigate('/validator/dashboard')
    }
  };




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
                          <button onClick={()=>handleclientbutton(request.PROJECTID)} style={{ display: 'block', margin: 'auto' }}>Client</button>
                          <button  onClick={()=> handlefreelancerbutton((request.PROJECTID))} style={{ display: 'block', margin: 'auto' }}>Freelancer</button>
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
