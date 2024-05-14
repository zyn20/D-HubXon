
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import useCountdown from './countdown';
import axios from 'axios'; // Make sure axios is imported
import abi from "../contract/FreelanceMarketplace.json";
import { ethers } from "ethers";
import Swal from "sweetalert2";

const colorClasses = {
  green: {
    text: 'text-green-500',
    bg: 'bg-green-400',
    hoverBg: 'hover:bg-green-500',
    shadow: 'shadow-green-400',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-400',
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-400',
    hoverBg: 'hover:bg-blue-500',
    shadow: 'shadow-blue-400',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-400',
  },
  // Add more colors as needed
};


const   Card = ({id, title, balance, color, duration, pricingType,status,takenby  , projectDeadline }) => {

  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [isLoading, setIsLoading] = useState(false); // State variable for loading screen
  const navigate = useNavigate(); // Initialize the navigate function
  const { days, hours, minutes, seconds } = useCountdown(projectDeadline);
  // Event handler for clicking the button
  const handleViewProposalsClick = () => {
    localStorage.setItem('project_id', id); // Store the project ID in local storage
    navigate('/allproposals'); // Navigate to the desired page. Replace '/some-other-page' with your target path
  };
  const handleDetailsClick = () => {
    localStorage.setItem('taken', takenby);
    navigate('/oneproposal'); 
  };

  useEffect(() => {
  

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
      navigate('/client')
    }
  };



  const handleCompleteProjectClick = async () => {
    try {

      const projectDetailResponse = await axios.get(
        "http://127.0.0.1:5000/client/getprojectbyid",
        {
            params: {
                PROJECTID: id
            }
        }
    );
    const budgetinINT=parseInt(projectDetailResponse.data.budget);
    const bugetInEther=budgetinINT/3076;
    const priceeINETHER = ethers.utils.parseEther(bugetInEther.toString());

    const ProjectID = parseInt(projectDetailResponse.data.BLOCKCHAININDEX); // Convert to int
    const tx = await state.contract.releasePayment(ProjectID, { value: priceeINETHER });
    setIsLoading(true);
    await tx.wait();




      
      await axios.post('http://127.0.0.1:5000/client/complete-project', { id });
      setIsLoading(false);

       window.location.reload();
    } catch (error) {
      console.error('Error completing project:', error);
      setIsLoading(false);

    }
    setIsLoading(false);

  };

const handleRequestClick=()=>{
  navigate("/client/DisputeSubmission",{ state: { PROJECTID:id} });  

}


  // Fallback to 'green' if the specified color is not found
  const classes = colorClasses[color] || colorClasses.green;

  return (
    // Set a fixed width and a minimum height for each card
    <div className="p-4 md:w-1/3 w-full flex flex-col items-stretch">
       {isLoading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        )}
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md shadow-indigo-50 min-h-[300px] w-full">
      <div className="text-sm font-medium">
  {status !== 'Done' && (
    <div className="flex items-center justify-center space-x-2">
      {days > 0 && (
        <span className="flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          <span>{days}</span>
          <span className="ml-1">days</span>
        </span>
      )}
      {hours > 0 && (
        <span className="flex items-center justify-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
          <span>{hours}</span>
          <span className="ml-1">hrs</span>
        </span>
      )}
      {minutes > 0 && (
        <span className="flex items-center justify-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          <span>{minutes}</span>
          <span className="ml-1">min</span>
        </span>
      )}
      <span className="flex items-center justify-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
        <span>{seconds}</span>
        <span className="ml-1">sec</span>
      </span>
    </div>
  )}
</div>
  
      <div className="w-full flex justify-between items-center">
       
       
        <h2 className="text-gray-900 text-lg font-bold text-center">{title}</h2>
        
          <div className={`w-24 h-24 rounded-full flex justify-center items-center shadow-2xl border-white border-dashed border-2 ${classes.shadow} bg-gradient-to-tr ${classes.gradientFrom} ${classes.gradientTo}`}>
            <div className="text-white text-2xl">{status}</div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Duration:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>{duration}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Pricing Type:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>{pricingType}</h3>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">Budget:</span>
            <h3 className={`text-xl font-bold ${classes.text}`}>${balance}</h3>
          </div>
        </div>
        {status === 'Active' ? (
          <div className='flex space-x-4'>
            <button  onClick={handleDetailsClick } className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Details
            </button>
            <button onClick={handleCompleteProjectClick} className={`mt-2 px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
              Complete Project
            </button>
            <button onClick={handleRequestClick} className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
            Request
          </button>
          </div>
        ) : status === 'Done' ? (
          <div className="mt-auto text-green-500 flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Completed Successfully!!!!
          </div>
        ):
         (
          <div className='flex  space-x-4'>
          <button onClick={handleViewProposalsClick} className={`mt-auto px-4 py-2 ${classes.bg} text-white rounded-lg tracking-wider ${classes.hoverBg} outline-none`}>
            View Proposals
          </button>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;



