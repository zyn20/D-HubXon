import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Freelancer/Navbar_Freelancer";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const ProposalSubmission = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [skillRequired, setskillRequired] = useState("");
  const [projectDuration, setprojectDuration] = useState("");
  const [pricingType, setpricingType] = useState("");
  const [projectDeadline, setprojectDeadline] = useState("");
  const [budget, setbudget] = useState("");
  const [file, setfile] = useState("");
  const [fileurl, setfileurl] = useState(null);
  const [proposalowner, setproposalowner] = useState("");
  const [coverletter, setcoverletter] = useState("");
  const [projectID, setProjectId] = useState(null);
  const [bidAmount, setBidAmount] = useState(100);
  const [EstimatedFee, setEstimatedFee] = useState(90);
  const [isLoading,setisLoading]=useState(false)
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);


  const connectmetamask = () => {
    if (window.ethereum) {
      if (!isChecked) {
        try {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((accounts) => {
              const selectedAddress = accounts[0];
              setmetamaskAddress(selectedAddress);

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
        text: "MetaMask is not available. Please install MetaMask to Send Proposal.",
        icon: "error",
      });
      navigate('/freelancer/search-jobs')
    }
  };

  const handleBidAmountChange = (e) => {
    // Check if the input value is a valid number
    const inputValue = parseFloat(e.target.value);
    if (isNaN(inputValue)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid number for the bid amount",
      });
      return;
    }

    setBidAmount(inputValue);
    const estimatedFee = deductTenPercent(inputValue);
    setEstimatedFee(estimatedFee);
  };

  const handlefilesubmit = (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (!selectedFile) {
        Swal.fire({
          icon: "error",
          title: "No File Selected",
          text: "Please select a file to upload",
        });
        return;
      }

      if (selectedFile.type !== "application/pdf") {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: "Please select a PDF file",
        });
        return;
      }
      setfile(selectedFile);
    } catch (error) {
      console.error("Error handling file:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while handling the file",
      });
    }

  };

  const uploadFile = () => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hixrhbq4");

      axios
        .post("https://api.cloudinary.com/v1_1/dig2awru0/upload", formData)
        .then((response) => {
          console.log("Cloudinary Response:", response.data.secure_url);
          setfileurl(response.data.secure_url);
          resolve(response.data.secure_url);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          reject(error);
        });
    });
  };

  function deductTenPercent(inputValue) {
    if (typeof inputValue !== "number" || isNaN(inputValue)) {
      return "Input value must be a valid number";
    }
    const deduction = inputValue * 0.1;
    const result = inputValue - deduction;
    return result;
  }

  const handleSubmitProposal = async () => {
    console.log("Submitting Proposal...");
    setisLoading(true);
    if (!coverletter  || !file) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Input",
        text: "Please Input All Values",
      });
      setisLoading(false);

      return;
    }
    try {
      const fileurl = await uploadFile();
      console.log("File URL is:", fileurl,coverletter,file);
  
     
  
      const ProposalData = {
        PROJECTID: projectID,
        BIDAMOUNT: bidAmount,
        COVERLETTER: coverletter,
        FILEURL: fileurl,
        PROPOSALOWNER: proposalowner,
        METAMASKADDRESS:metamaskAddress
      };
      console.log(ProposalData);
      const response = await axios.post(
        "http://127.0.0.1:5000/freelancer/submitproposal",
        ProposalData
      );
      console.log("Response:", response);
      setisLoading(false);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your proposal has been sent.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while sending the proposal.",
          icon: "error",
        });
      }

      navigate("/freelancer/search-jobs");


    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };
  

  useEffect(() => {
    connectmetamask();
    settitle(location.state.title);
    setdescription(location.state.description);
    setskillRequired(location.state.skillRequired);
    setprojectDuration(location.state.projectDuration);
    setpricingType(location.state.pricingType);
    setprojectDeadline(location.state.projectDeadline);
    setbudget(location.state.budget);
    setProjectId(location.state.ID);

    if (projectID) {
      console.log("-------------------");
      console.log("Ali" + projectID);
      console.log("===================");
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setproposalowner(decodedToken.freelancerData.email);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-8 ">
      {isLoading && (
          <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}

        <div className="w-full max-w-2xl p-6  rounded-lg shadow-md bg-blue-100 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">
            Submit a Proposal
          </h1>

          {/* Proposal Settings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">
              {title}
            </h2>
          </div>

          {/* Job Details */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center text-blue-950">
              Job Details
            </h2>
          </div>

          <div>
            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                SKILL REQUIRED:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {skillRequired}
              </p>
            </div>

            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                Deadline:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {projectDeadline}
              </p>
            </div>

            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                Pricing Type:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {pricingType}
              </p>
            </div>

            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                Project Budget:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {budget}$
              </p>
            </div>

            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                Project Duration:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {projectDuration}
              </p>
            </div>

            <div className="flex">
              <h1 className="text-xl font-semibold mb-4 text-center text-blue-950">
                DESCRIPTION:{" "}
              </h1>
              <p className="text-gray-700 mb-4 text-center  text-xl ">
                {description}
              </p>
            </div>
          </div>

          {/* Bid Section */}
          <div className="mb-8 mt-3">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <label className="block text-sm font-medium text-gray-700 text-center">
                  Bid Amount
                </label>
                <div className="mt-1 relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="bidAmount"
                    id="bidAmount"
                    className="border-4 border-blue-400 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm  rounded-md"
                    placeholder="0.00"
                    value={bidAmount}
                    onChange={handleBidAmountChange}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-center text-blue-950"></h2>
            <p className="text-gray-700 mb-4 text-center font-semibold">
              Total amount the client will see on your proposal:{bidAmount}$
            </p>

            <p className="text-gray-700 mb-4 text-center">
              The estimated amount you'll receive after service fees:
              {EstimatedFee}$
            </p>
          </div>

          {/* Cover Letter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">
              Cover Letter
            </h2>
            <textarea
              className="border-4 border-blue-400  p-4 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              placeholder="Write your cover letter..."
              onChange={(e) => {
                setcoverletter(e.target.value);
              }}
            ></textarea>
          </div>

          {/* Attachments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">
              Attachments
            </h2>
            <input
              type="file"
              accept=".pdf"
              className="block w-full text-sm text-gray-700 border-gray-300 rounded-md"
              onChange={handlefilesubmit}
            />
            {/* Conditionally render the file name */}
          </div>

          {/* Boost Proposal (optional) */}
          {/* <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Boost Proposal (optional)</h2>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              Boost Proposal
            </button>
          </div>
        </div> */}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleSubmitProposal}
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalSubmission;
