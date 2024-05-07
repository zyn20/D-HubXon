import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import abi from "../../../contract/Courses.json";
import { ethers } from "ethers";
import Swal from "sweetalert2";

const Product = ({ product }) => {
  // const { addToCart } = useContext(CartContext);

  const { id, image, category, title, price, BLOCKCHAININDEX } = product;

  // Construct the full URL for the image
  const imageUrl = `http://127.0.0.1:5000${
    image.startsWith("/uploads") ? image : "/uploads/" + image
  }`;

  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const PurchaseFunction = async (product, id) => {
    const { provider, contract } = state;
    if (!provider || !contract) {
      console.error("Provider or contract not initialized");
      return;
    }

    try {
      const accounts = await provider.listAccounts();
      const account = accounts[0];

      const balance = await provider.getBalance(account);

      const balanceEther = ethers.utils.formatEther(balance);

      const balanceUSD = balanceEther * 3076;
      console.log("Balance in USD of Metamask:", balanceUSD);

      const coursePrice = price / 3076;

      if (balanceUSD < coursePrice) {
        Swal.fire({
          icon: "error",
          title: "Insufficient Balance",
          text: "Your Metamask balance is not sufficient for this purchase",
        });
        return;
      }

      const courseId = ethers.BigNumber.from(BLOCKCHAININDEX);
      const pricee = ethers.utils.parseEther(coursePrice.toString());
      console.log("price is", coursePrice);
      const tx = await contract.purchase(courseId, { value: pricee });

      await tx.wait();

      Swal.fire({
        icon: "success",
        title: "Purchase Successful",
        text: "Congratulations! You have successfully purchased the course",
      });
    } catch (error) {
      console.error("Error occurred during purchase:", error);
      Swal.fire({
        icon: "error",
        title: "Purchase Failed",
        text: "An error occurred during the purchase. Please try again later",
      });
    }
  };

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
        text: "MetaMask is not available. Please install MetaMask to ADD Course.",
        icon: "error",
      });
      // navigate('/freelancer/courses')
    }
  };

  useEffect(() => {
    connectmetamask();
    const template = async () => {
      const contractAddress = "0x650fcd847258fF3f0d03d100AE6fdf0fEc9AE9Ab";
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

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition text-blue-500">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={imageUrl}
              alt={title}
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* <button onClick={() => addToCart(product, id)}> */}
          <button onClick={() => PurchaseFunction(product, id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-blue-500 drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category, title & price */}
      <div>
        <div className="tex-sm capitalize text-blue-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1 text-blue-500">{title}</h2>
        </Link>
        <h2 className="font-semibbold text-blue-500">$ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
