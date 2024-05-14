import React, { useState,useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Navbar_Client from "../components/client/Navbar";
import { jwtDecode } from "jwt-decode";
import abi from "../contract/FreelanceMarketplace.json";



const PostProject = () => {
  const [isLoading, setIsLoading] = useState(false); // State variable for loading screen
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectDuration, setProjectDuration] = useState("");
  const [pricingType, setPricingType] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [budget, setBudget] = useState("");
  const [KEYWORDS, setKEYWORDS] = useState();
  const [customSkill, setCustomSkill] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [projectowner,setprojectowner]=useState("");

  const navigate = useNavigate();

  const validation = () => {
    const enteredDeadline = new Date(projectDeadline).getTime();
    const currentDateTime = new Date().getTime();
    const errors = {};

    if (!projectDuration)
      errors.projectDuration = "Project duration is required";
    if (!pricingType) errors.pricingType = "Pricing type is required";
    if (!projectDeadline)
      errors.projectDeadline = "Project deadline is required";
    if (!selectedSkill) errors.selectedSkill = "Skill required is required";

    if (!title) {
      errors.description = "Title is required";
    } else if (title.length < 10 || title.length > 50) {
      errors.description = "Title must be between 10 and 50 characters";
    }

    if (!description) {
      errors.description = "Description is required";
    } else if (description.length < 50 || description.length > 200) {
      errors.description = "Description must be between 50 and 200 characters";
    }


    if (!budget || !/^[1-9]\d*$/.test(budget)) {
      errors.budget = "Budget must be a positive integer";
    }

    if (!projectDeadline || enteredDeadline <= currentDateTime) {
      errors.projectDeadline = "Project deadline must be in the future";
    }
    if (selectedSkill === "Others" && !customSkill) {
      errors.customSkill = "Enter other skill";
    }

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: Object.values(errors)
          .map((error) => `<p>${error}</p>`)
          .join(""),
      });

      return false;
    }

    return true;
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setprojectowner(decodedToken.clientData.email);
    }

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


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const tx = await state.contract.uploadProject(
            title,
            selectedSkill === "Others" ? customSkill : selectedSkill,
            projectDuration,
            projectDeadline,
            parseInt(budget)
        );
        setIsLoading(true);


        await tx.wait();

        const latestProjectId = await state.contract.latestProjectId();
        const latestProjectIdint=latestProjectId.toNumber()

        console.log("latestProjectID:", latestProjectIdint);

        const response = await axios.post(
            "http://127.0.0.1:5000/client/post_project",
            {
                title,
                description,
                skillRequired: selectedSkill === "Others" ? `${customSkill}` : selectedSkill,
                projectDuration,
                pricingType,
                projectDeadline,
                budget,
                KEYWORDS,
                projectowner,
                latestProjectIdint            }
        );
        setIsLoading(false);
        Swal.fire("Project posted successfully");
        navigate("/client/");
    } catch (error) {
        console.error("Error posting project:", error);
    }
    setIsLoading(false);

};


  return (
    <>
      <Navbar_Client />
      <form
        onSubmit={handleSubmit}
        className="py-20 bg-gray-100 bg-opacity-50 h-[70%]"
      >
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md bg-white rounded-lg overflow-hidden">

        {isLoading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        )}




          <div className="bg-green-500 text-white p-4">
            <h1 className="text-2xl font-bold">Post a New Project</h1>
          </div>
          <div className="p-4">
            {/* Job Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Write title of your project"
                title="Title should be between 10 and 50 characters."

              />
            </div>

            {/* Detailed Info Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="What do you want?"
                title="Description should be between 50 and 200 characters."
              />
            </div>

            {selectedSkill !== "Others" && (
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Skill required
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="" selected>
                    Select an option
                  </option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            )}

            {selectedSkill === "Others" && (
              <div className="mt-2">
                <label className="block text-gray-600 text-sm font-semibold mb-2">
                  Enter Other Skill
                </label>
                <input
                  onChange={(e) => setCustomSkill(e.target.value)}
                  value={customSkill}
                  type="text"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                  placeholder="Enter other skill"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Project Duration
              </label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => setProjectDuration(e.target.value)}
              >
                <option value="" selected>
                  Select an option
                </option>
                <option value="Long Term">Long Term</option>
                <option value="Short Term">Short Term</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            {/* Pricing Info Section */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Price
              </label>
              <select
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                onChange={(e) => setPricingType(e.target.value)}
              >
                <option value="" selected>
                  Select an option
                </option>
                <option value="Fixed">Fixed</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Project Deadline
              </label>
              <input
                onChange={(e) => setProjectDeadline(e.target.value)}
                type="datetime-local"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Budget
              </label>
              <input
                onChange={(e) => setBudget(e.target.value)}
                value={budget}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Enter your budget"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                KEYWORDS
              </label>
              <input
                onChange={(e) => setKEYWORDS(e.target.value)}
                value={KEYWORDS}
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500"
                placeholder="Enter KeyWords Related to your Project (Space-separated)"
                title="e.g REACT BACKEND FLUTTER NODEJS"

              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white rounded-md bg-green-500 py-2 px-8 inline-flex items-center focus:outline-none"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostProject;
