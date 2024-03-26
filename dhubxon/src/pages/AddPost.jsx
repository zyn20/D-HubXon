import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ethers } from "ethers";
import abi from "../contract/ContributeProjects.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-tailwind/react";

const AddPost = () => {
  var blockchainindex = -1;
  const [isLoading, setIsLoading] = useState(false); // State variable for loading screen
  const [postData, setPostData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [Postimageurls, setImageUrls] = useState([]);
  const [contribute, setContribute] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [metamaskAddress,setmetamaskAddress]=useState("Not Connected");
  const [Projectindex, setProjectindex] = useState(-1);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [Contract, setContract] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPostData(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [...images];
    const newImageUrls = [...Postimageurls];

    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
      newImageUrls.push(URL.createObjectURL(files[i]));
    }

    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x024F0132dBA92E47dEfF82cB0d901E71c47FdF60";
      const contractABI = abi.abi;
  
      try {
        const { ethereum } = window;
  
        ethereum.on("accountsChanged", (accounts) => {
          const selectedAddress = accounts[0];
          setmetamaskAddress(selectedAddress ? `Connected: ${selectedAddress}` : "Not Connected");
  
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
  
          setState({ provider, signer, contract });
          setContract(state.contract);
  
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
        setContract(state.contract);
  
        console.log("useeffect Contract Data is:", state);
      } catch (error) {
        console.log(error);
      }
    };
  
    template();
  }, []);
  

  const uploadImages = async () => {
    const uploadedImageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageUrl = await uploadImage(images[i]);
      uploadedImageUrls.push(imageUrl);
    }

    return uploadedImageUrls;
  };

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "hixrhbq4");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dig2awru0/image/upload",
          formData
        )
        .then((response) => {
          console.log("Cloudinary Response is:", response.data.secure_url);
          resolve(response.data.secure_url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          reject(error);
        });
    });
  };

  const handlecontributetoggle = () => {
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
        text: "MetaMask is not available. Please install MetaMask to enable contribution.",
        icon: "error",
      });
    }
  };

  const getCurrentDateTimeString = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${dateString} ${timeString}`;
    return dateTimeString;
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    const newImageUrls = [...Postimageurls];
    newImages.splice(index, 1);
    newImageUrls.splice(index, 1);
    setImages(newImages);
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when submitting form


    setIsSubmitting(true);

    if (isChecked == true) {
      try {


        const createproject=await state.contract.createProject(postData);
        console.log("Hash:",createproject.hash);



        const latestProjectIdBigNumber =
          await state.contract.getLatestProject();
        const latestProjectIdInteger = ethers.utils
          .parseUnits(latestProjectIdBigNumber.toString(), "wei")
          .toNumber();
        blockchainindex = latestProjectIdInteger;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Transaction Canceled",
          text: "The transaction was canceled by the user.",
        });
        setIsSubmitting(false);
        return;
      }
    }



    if(images.length==0 && postData ==""){
      Swal.fire({
        title: "Error!",
        text: "Please Add Something.",
        icon: "error",
      });
      return

    }

    let imageUrls = [];
    if (images.length > 0) {
      imageUrls = await uploadImages();
    }

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const post = {
      NAME: decodedToken.freelancerData.name,
      PICTURES: imageUrls,
      TIME: getCurrentDateTimeString(),
      CONTENT: postData,
      LIKES: 0,
      COMMENTS: 0,
      EMAIL: decodedToken.freelancerData.email,
      BLOCKCHAININDEX: blockchainindex,
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/freelancer/ADDcommunity_post",
      post
    );

    if (response.status === 201) {
      Swal.fire({
        title: "Success!",
        text: "Your post has been added.",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the post.",
        icon: "error",
      });
    }

    console.log("Post data sent successfully:", response.data);
    navigate("/freelancer/community");

    setPostData("");

    console.log("images urls:", imageUrls);

    
    setIsLoading(true); // Set loading state to true when submitting form

    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto mt-8 bg-gray-100 shadow-md rounded-lg p-8">

{isLoading && (
          <div className="flex items-center justify-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}

      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Add a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-3">
        <button
          type="button"
          onClick={handlecontributetoggle}
          class="flex items-center justify-center w-48 text-black bg-white border border-black h-14 rounded-xl"
        >
          <div class="mr-3">
            <img
              src="https://docs.material-tailwind.com/icons/metamask.svg"
              alt="metamask"
              className="h-6 w-6"
            />
          </div>
          <div>
            <div class=" font-bold">Connect to </div>
            <div class=" font-bold">Metamask </div>

          </div>
        </button>
<div className="mt-8 ml-1">{metamaskAddress}</div>
        </div>

        <div className="mb-4">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Share Your Thoughts
            </label>
            <input
  type="text"
  id="postData"
  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  placeholder="Enter your post data"
  value={postData}
  onChange={handleInputChange}
  disabled={isSubmitting}
  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
/>

          </div>
        </div>

        {/* Image preview */}
        {images.length > 0 && (
          <div className="mb-2">
            <Carousel infiniteLoop>
              {Postimageurls.map((imageUrl, index) => (
                <div key={index} className="h-64 relative">
                  <img
                    src={imageUrl}
                    alt={`Uploaded ${index}`}
                    className="object-contain max-h-full max-w-full"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* <div>
          <input type="file" onChange={handleImageChange} multiple />
        </div> */}

        <div class="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36 ml-2">
          <label
            for="upload"
            class="flex flex-col items-center gap-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-gray-600 font-medium">Upload file</span>
          </label>
          <input
            id="upload"
            type="file"
            class="hidden"
            onChange={handleImageChange}
            multiple
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mt-3 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Post..." : "Add Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
