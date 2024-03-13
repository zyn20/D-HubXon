import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import {ContractInstance} from '../contract/ContractInstance';
import { ethers } from "ethers";
import abi from "../contract/ContributeProjects.json";

const AddPost = () => {
  var blockchainindex = -1;
  // const [blockchainindex, setblockchainindex] = useState(-1);
  const [postData, setPostData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [Postimageurl, setimageurl] = useState(null);
  const [contribute, setContribute] = useState(false); // Toggle for enabling/disabling contribution
  const [isChecked, setIsChecked] = useState(false);
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
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x024F0132dBA92E47dEfF82cB0d901E71c47FdF60";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
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

  const uploadimage = () => {
    return new Promise((resolve, reject) => {
      const formdata = new FormData();
      formdata.append("file", image);
      formdata.append("upload_preset", "hixrhbq4");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dig2awru0/image/upload",
          formdata
        )
        .then((response) => {
          console.log("Cloudinary Response is:", response.data.secure_url);
          setimageurl(response.data.secure_url);
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
              console.log("MetaMask Address:", selectedAddress);

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


  const handleSubmit = async (e) => {
    var imageUrl;
    e.preventDefault();
    setIsSubmitting(true);
  
    if (isChecked == true) {
      try {
        const latestProjectIdBigNumber = await state.contract.getLatestProject();
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
  
    try {
 if (image == null) {
  imageUrl = "NOT";
} else {
  imageUrl = await uploadimage();
}
console.log("ImageURL is:", imageUrl);

const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);
console.log("Decoded Token:", decodedToken);

const post = {
  NAME: decodedToken.freelancerData.name,
  PICTURE: imageUrl,
  TIME: getCurrentDateTimeString(),
  CONTENT: postData,
  LIKES: 0,
  COMMENTS: 0,
  EMAIL: decodedToken.freelancerData.email,
  IMAGEURL: imageUrl,
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

setPostData("");    } catch (error) {
      console.error("Error sending post data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="container mx-auto mt-8 bg-gray-100 shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Add a Post</h1>
      <form onSubmit={handleSubmit}>
        <div name="contribute" className="justify-end">
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handlecontributetoggle}
              className="sr-only"
            />
            
            <span
              className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                isChecked ? "bg-[#413eed]" : "bg-[#CCCCCE]"
              }`}
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  isChecked ? "translate-x-[28px]" : ""
                }`}
              ></span>
            </span>
            <span className="label flex items-center text-sm font-medium text-black">
              Enable Contribution
            </span>
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="postData"
            className="block text-sm font-medium text-gray-700"
          >
            Post Data
          </label>
          <input
            type="text"
            id="postData"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your post data"
            value={postData}
            onChange={handleInputChange}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <input type="file" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className={`bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Post..." : "Add Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
