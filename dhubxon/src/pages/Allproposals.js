import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import abi from "../contract/FreelanceMarketplace.json";
import { ethers } from "ethers";
import Swal from "sweetalert2";


const TableComponent = () => {
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [proposals, setProposals] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentProposalOwner, setCurrentProposalOwner] = useState('');
  const [currentProjectId, setCurrentProjectId] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProposals = async () => {
      const projectId = localStorage.getItem('project_id');
      console.log('Project id is  : ',projectId)
      if (!projectId) {
        console.error('No project ID found in local storage.');
        return;
      }
      try {
        const response = await axios.post('http://127.0.0.1:5000/client/proposals', { project_id: projectId });
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchProposals();

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

  const handleViewCoverLetter = (coverLetter) => {
    setCoverLetter(coverLetter);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirmAccept = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/client/update-project', {
        id: currentProjectId,
        takenby: currentProposalOwner
      });
      console.log(response.data); // Or handle success as you see fit
      setShowConfirmationModal(false); // Close the modal after successful update
      // Optionally, refresh proposals list or navigate the user away
      const uniqueTimestamp = new Date().getTime();
    navigate(`/proposals?refresh=${uniqueTimestamp}`);
    } catch (error) {
      console.error('Error updating project:', error);
      // Handle error (e.g., display an error message)
    }
  };
  
  

const handleAcceptClick = async (proposalOwner, projectId, ProposalId, METAMASKADDRESS, BIDAMOUNT) => {
  try {
    const { provider} = state;
      console.log("METAMASKADDRESS:", METAMASKADDRESS);
      console.log("ProjectID:", projectId);
      await axios.post('http://127.0.0.1:5000/client/deleteallotherproposals', {
          ProposalID: ProposalId
      });

      // Fetch project details from the backend
      const projectDetailResponse = await axios.get(
          "http://127.0.0.1:5000/client/getprojectbyid",
          {
              params: {
                  PROJECTID: projectId
              }
          }
      );

      // Fetch Metamask account and balance
      const accounts = await provider.listAccounts();
      const account = accounts[0];
      const balance = await provider.getBalance(account);
      const balanceEther = ethers.utils.formatEther(balance);
      const balanceUSD = balanceEther * 3076;

      console.log("Balance in USD of Metamask:", balanceUSD);

      // Convert bid amount to ethers
      const BIDINETHERS = BIDAMOUNT / 3076;
      console.log("BID in Ether:",BIDINETHERS);
      const priceeINETHER = ethers.utils.parseEther(BIDINETHERS.toString());

      // Check if Metamask balance is sufficient for the bid amount
      if (balanceUSD < BIDAMOUNT) {
          Swal.fire({
              icon: "error",
              title: "Insufficient Balance",
              text: "Your Metamask balance is not sufficient for this purchase",
          });
          return;
      }

      


      // Extract project ID and take the project in the contract
      const projectDetail = projectDetailResponse.data;
      const ProjectID = parseInt(projectDetail.BLOCKCHAININDEX); // Convert to int
      console.log("Freelancer Address is:",METAMASKADDRESS);
      const tx = await state.contract.takeProject(ProjectID, METAMASKADDRESS,);

      await tx.wait();

      console.log("Project Detail:", projectDetail);

      // Set current proposal owner and project ID
      setCurrentProposalOwner(proposalOwner);
      setCurrentProjectId(projectId);
      setShowConfirmationModal(true);
  } catch (error) {
      console.error("Error handling accept click:", error);
      // Handle error appropriately
  }
};



  const handleModalClose = () => {
    setShowConfirmationModal(false);
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-center bg-green-500 text-white">
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">ID</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Bid Amount</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Proposal By</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((proposal, index) => (
                    <tr key={index} className="text-center text-dark font-medium text-base">
                      <td className="py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]">{proposal.PROJECTID}</td>
                      <td className="py-5 px-2 bg-white border-b border-[#E8E8E8]">${proposal.BIDAMOUNT}</td>
                      <td className="py-5 px-2 bg-[#F3F6FF] border-b border-[#E8E8E8]">{proposal.PROPOSALOWNER}</td>
                      <td className="py-5 px-2 bg-white border-b border-r border-[#E8E8E8] flex justify-center items-center gap-4">
                        <a href={proposal.FILEURL} target="_blank" rel="noopener noreferrer" className="border border-green-500 py-2 px-6 text-green-500 inline-block rounded hover:bg-green-500 hover:text-white">Open CV</a>
                        <button onClick={() => handleViewCoverLetter(proposal.COVERLETTER)} className="border border-green-500 py-2 px-6 text-green-500 inline-block rounded hover:bg-green-500 hover:text-white">View Cover Letter</button>
                        <button onClick={() => handleAcceptClick(proposal.PROPOSALOWNER, proposal.PROJECTID,proposal.id,proposal.METAMASKADDRESS,proposal.BIDAMOUNT)} className="bg-green-500 py-2 px-6 text-white inline-block rounded hover:bg-green-600">Accept</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Cover Letter</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">{coverLetter}</p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="okBtn"
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={handleCloseModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-5 m-4 max-w-sm max-h-full text-center">
              <div className="mb-4">
                <p className="text-lg font-semibold">Are you sure you want to proceed?</p>
                <p className="text-sm text-gray-600 mt-2">By accepting, you will select this proposal and decline all others.</p>
              </div>
              <div className="flex justify-center">
                <button onClick={handleConfirmAccept} className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Yes</button>
                <button onClick={handleModalClose} className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 rounded-lg text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TableComponent;
