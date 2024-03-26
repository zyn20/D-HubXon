import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import Navbar from "../components/Freelancer/Navbar_Freelancer";
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
  const [selectedCategory, setSelectedCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [isLoading,setisLoading]=useState(false)

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


  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategory(value);
    if (value !== 'Other') {
      setOtherCategory('');
    }
  };

  const handleOtherCategoryChange = (event) => {
    setOtherCategory(event.target.value);
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
    setisLoading(true);
    console.log("Submitting Proposal...");
    if (!coverletter  || !file) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Input",
        text: "Please Input All Values",
      });
      setisLoading(false)
      return;
    }
    try {
      const fileurl = await uploadFile();
      console.log("File URL is:", fileurl,coverletter,file);

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const Email = decodedToken.clientData.email;
  
      var Category=";"
     if(selectedCategory==''){
        Category=otherCategory
     }
     else{
        Category=selectedCategory
     }
  
      const ProposalData = {
        PROJECTID: location.state.PROJECTID,
        Category: Category,
        COVERLETTER: coverletter,
        FILEURL: fileurl,
        DISPUTEREQUESTOWNER: Email,
      };
      console.log(ProposalData);
      const response = await axios.post(
        "http://127.0.0.1:5000/client/submitDisputeRequest",
        ProposalData
      );
      console.log("Response:", response);
      setisLoading(false)

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your Request has been sent.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while sending the proposal.",
          icon: "error",
        });
      }

      navigate("/client");


    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };
  

  useEffect(() => {
    let source = axios.CancelToken.source(); // Create a cancel token source
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/client/getprojectbyid",
          {
            params: {
              PROJECTID: location.state.PROJECTID,
            },
            cancelToken: source.token, // Pass the cancel token to the axios request
          }
        );
  
        const fetchedData = response.data;
        console.log("Fetched Data:", fetchedData);
  
        settitle(fetchedData.title);
        setdescription(fetchedData.description);
        setskillRequired(fetchedData.skillRequired);
        setprojectDuration(fetchedData.projectDuration);
        setpricingType(fetchedData.pricingType);
        setprojectDeadline(fetchedData.projectDeadline);
        setbudget(fetchedData.budget);
        setProjectId(fetchedData.ID);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching project data:", error);
        }
      }
    };
  
    fetchData();
  
    return () => {
      source.cancel("Component unmounted"); 
    };
  }, [location.state.PROJECTID]);
  

  return (
    <>
      {/* <Navbar /> */}
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
          <div className="w-full max-w-md mt-4 ml-[8vw]">
        <label className="block text-sm font-medium text-gray-700">
          Category of Disputes
        </label>
        {selectedCategory !== 'Other' ? (
          <select
            className="border-4 border-blue-400 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 py-1 sm:text-sm rounded-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Quality of Work">Quality of Work</option>
            <option value="Payment Dispute">Payment Dispute</option>
            <option value="Deadline Missed">Deadline Missed</option>
            <option value="Communication Issue">Communication Issue</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input
            type="text"
            className="border-4 border-blue-400 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-10 sm:text-sm rounded-md"
            placeholder="Enter Category"
            value={otherCategory}
            onChange={handleOtherCategoryChange}
          />
        )}
      </div>

            
          </div>

          {/* Cover Letter */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">
             Write Your Issue Detail
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
              Add ScreenShots
            </h2>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 border-gray-300 rounded-md"
              onChange={handlefilesubmit}
            />
          </div>

          

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
