import React, { useState,useEffect } from "react";
import {
  FaCheckCircle,
  FaRegCircle,
  FaHeadphonesAlt,
  FaBookOpen,
  FaHeartbeat,
  FaUserMd,
  FaUsers,
  FaPiggyBank,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode"; // Corrected import
import  DataForClaim  from "../components/SubscribeButtons/DataForClaim";
import abi from "../contract/SubscriptionContract.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";


const PricingHealth = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State variable for loading screen
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [userSubscription, setUserSubscription] = useState(null);
  const subscriptionType = searchParams.get("type"); // Default to 'Healthcare' if not specified
  const [metamaskAddress, setmetamaskAddress] = useState("Not Connected");
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const navigate = useNavigate();



 
  

  useEffect(() => {
    

    checkSubscriptionStatus();

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
      navigate('/freelancer/')
    }
  };



  const checkSubscriptionStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("User not logged in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const useremail = decoded.freelancerData.email;
      const response = await fetch(`http://localhost:5000/freelancer/subscription-status?useremail=${useremail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }

      const data = await response.json();
      const healthcareSubscription = data.find(sub => sub.subscriptionType === 'Healthcare');
      setUserSubscription(healthcareSubscription);
    } catch (error) {
      console.error("Error fetching subscription status:", error);
    }
  };



  const features = [
    { name: "24/7 On-call Support", Icon: FaHeadphonesAlt },
    { name: "Unlimited Access to Health Resources", Icon: FaBookOpen },
    { name: "Exclusive Wellness Programs", Icon: FaHeartbeat },
    { name: "Personal Health Advisor", Icon: FaUserMd },
    { name: "Family Health Plans", Icon: FaUsers },
    { name: "Double Savings Benefit", Icon: FaPiggyBank },
  ];

  const handleClaimClick = () => {
    setShowClaimForm(true); // Show the claim form when the button is clicked
  };

  const handleCloseClaimForm = () => {
    setShowClaimForm(false); // Close the claim form
  };

  const packages = [
    {
      name: "Sprout Plan",
      priceMonthly: 29,
      priceYearly: 290,
      includes: [true, true, false, false, false, false],
    },
    {
      name: "Growth Plan",
      priceMonthly: 59,
      priceYearly: 590,
      includes: [true, true, true, true, false, false],
    },
    {
      name: "Harvest Plan",
      priceMonthly: 99,
      priceYearly: 990,
      includes: [true, true, true, true, true, true],
    },
  ];

  const handleSubscribe = async (packageType, deductionAmount) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "You must be logged in to subscribe.", "error");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      Swal.fire("Error", "Invalid token.", "error");
      return;
    }

    const useremail = decodedToken?.freelancerData?.email;
    if (!useremail) {
      Swal.fire("Error", "Could not determine user email from token.", "error");
      return;
    }

    const tenure = isYearly ? "1 year" : "1 month";

    const confirmed = await Swal.fire({
      title: `Subscribe to ${packageType}?`,
      text: `This will deduct $${deductionAmount} from your account.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, subscribe!",
    });

    setIsLoading(true);

    const { provider} = state;
    const accounts = await provider.listAccounts();
    const account = accounts[0];
    const balance = await provider.getBalance(account);
    const balanceEther = ethers.utils.formatEther(balance);
    const balanceUSD = balanceEther * 3076;

    if (balanceUSD < deductionAmount) {
      Swal.fire({
          icon: "error",
          title: "Insufficient Balance",
          text: "Your Metamask balance is not sufficient for this purchase",
      });
      setIsLoading(false);

      return;
  }


  const AmountINether = deductionAmount / 3076;
  const priceeINETHER = ethers.utils.parseEther(AmountINether.toString());

  const tx = await state.contract.createSubscription(
    subscriptionType,
    tenure,
    parseInt(deductionAmount),
    { value: priceeINETHER }
);

console.log("Hash:",tx.hash)

const receipt = await tx.wait(); // Get the transaction receipt
const latestSubscriptionId = await state.contract.latestSubscriptionIndex();
        const latestSubscriptionIdint=latestSubscriptionId.toNumber()
console.log("latestSubscriptionIdint:",latestSubscriptionIdint)


    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(
          "http://localhost:5000/freelancer/create-subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              subscriptionType,
              subscribed: true,
              tenure,
              deductionAmount,
              packageType,
              useremail,
              latestSubscriptionIdint,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to subscribe");
        }
        setIsLoading(false);
        Swal.fire(
          "Subscribed!",
          `You have been subscribed to the ${packageType}.`,
          "success"
        );

      } catch (error) {
        console.error("Subscription error:", error);
        setIsLoading(false);

        Swal.fire(
          "Subscription failed",
          "There was a problem with your subscription.",
          "error"
        );
      }
    }
  };
  const handleUnsubscribe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "You must be logged in to unsubscribe.", "error");
      return;
    }

    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You will lose access to the subscribed benefits.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unsubscribe!'
    });

    if (confirmed.isConfirmed) {
      try {
        const decodedToken = jwtDecode(token);
        const useremail = decodedToken?.freelancerData?.email;
        const response = await fetch(`http://localhost:5000/freelancer/unsubscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            useremail,
            subscriptionType
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to unsubscribe');
        }

        await checkSubscriptionStatus(); // Refresh the subscription status
        Swal.fire('Unsubscribed!', 'You have successfully unsubscribed.', 'success');
      } catch (error) {
        console.error('Error unsubscribing:', error);
        Swal.fire('Unsubscribe failed', 'There was a problem with your unsubscription.', 'error');
      }
    }
  };

  return (
    <div className="py-12 bg-blue-50">
        {isLoading && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                </div>
            </div>
        )}
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-blue-800">
            DHUBXON Health Care Subscriptions
          </h2>
          <p className="text-blue-600 mt-3">
            Empowering Freelancers with Comprehensive Health Plans
          </p>
          <div className="mt-8 inline-flex justify-center items-center bg-blue-200 rounded-full p-1 transition-colors duration-300 ease-in-out">
            <span className="text-blue-700 font-medium">Monthly</span>
            <label className="switch mx-3">
              <input type="checkbox" onChange={() => setIsYearly(!isYearly)} />
              <span className="slider round"></span>
            </label>
            <span className="text-blue-700 font-medium">Yearly (Save 20%)</span>
          </div>
        </div>
  
        {/* Claim button */}
        <div className="text-center mb-8">
          <button
            onClick={handleClaimClick}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Claim
          </button>
        </div>
  
        {/* Render the claim form if showClaimForm state is true */}
        {showClaimForm && <DataForClaim onClose={handleCloseClaimForm} />}
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-xl bg-white p-8 transition duration-500 ${
                userSubscription?.packageType === pkg.name
                  ? "ring-4 ring-blue-500"
                  : "hover:shadow-2xl"
              }`}
            >
              <h3 className="text-2xl font-bold text-blue-800 mb-5">{pkg.name}</h3>
  
              {/* Package details */}
              <div className="text-lg mb-5">
                <span className="font-bold">
                  ${isYearly ? pkg.priceYearly : pkg.priceMonthly}
                </span>
                <span className="text-gray-600">
                  {" "}
                  / {isYearly ? "yr" : "mo"}
                </span>
              </div>
  
              {/* Features */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <feature.Icon
                      className={`text-xl mr-2 ${
                        pkg.includes[featureIndex]
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`${
                        pkg.includes[featureIndex]
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {feature.name}
                    </span>
                    <span className="ml-auto">
                      {pkg.includes[featureIndex] ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaRegCircle className="text-gray-300" />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
  
              {/* Subscription button */}
              <div className="flex justify-center">
                {userSubscription?.packageType === pkg.name ? (
                  <button
                    onClick={handleUnsubscribe}
                    className="w-full py-3 text-white bg-red-500 rounded-lg font-medium hover:bg-red-600 transition duration-300"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleSubscribe(
                        pkg.name,
                        isYearly ? pkg.priceYearly : pkg.priceMonthly
                      )
                    }
                    className="w-full py-3 text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default PricingHealth;

