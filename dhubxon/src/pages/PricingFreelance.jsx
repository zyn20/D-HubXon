
import React, { useState,useEffect } from "react";
import { FaCheckCircle, FaRegCircle, FaRocket, FaUserAstronaut, FaStar, FaUsers, FaEnvelopeOpenText, FaHandshake } from 'react-icons/fa';
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode"; 

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState(null);
  const subscriptionType = searchParams.get("type"); // Default to 'Healthcare' if not specified
  const togglePlan = () => setIsYearly(!isYearly);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);
  

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
    { name: 'Direct Client Access', Icon: FaUsers },
    { name: 'Priority Proposal Placement', Icon: FaEnvelopeOpenText },
    { name: 'Exclusive Job Offers', Icon: FaHandshake },
    { name: 'Personal Branding Support', Icon: FaUserAstronaut },
    { name: 'Stellar Success Managers', Icon: FaStar }
  ];

  const packages = [
    {
      name: 'Launch Pad',
      description: 'Kickstart your freelance journey',
      priceMonthly: 19,
      priceYearly: 190,
      includes: [true, false, false, false, false]
    },
    {
      name: 'Orbit',
      description: 'Elevate your presence and reach new heights',
      priceMonthly: 49,
      priceYearly: 490,
      includes: [true, true, true, false, false]
    },
    {
      name: 'Stellar',
      description: 'Achieve galactic success with premium features',
      priceMonthly: 99,
      priceYearly: 990,
      includes: [true, true, true, true, true]
    }
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
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to subscribe");
        }

        Swal.fire(
          "Subscribed!",
          `You have been subscribed to the ${packageType}.`,
          "success"
        );
      } catch (error) {
        console.error("Subscription error:", error);
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
    <div className="py-12 bg-gradient-to-br from-indigo-200 to-purple-300">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-purple-800">Galactic Freelance Marketplace Plans</h2>
        <p className="text-purple-700 mt-3">Propel Your Freelance Career to New Heights</p>
        <div className="mt-8">
          <span className="text-sm font-medium text-purple-700">MONTHLY</span>
          <label className="switch mx-3">
            <input type="checkbox" checked={isYearly} onChange={togglePlan} />
            <span className="slider round"></span>
          </label>
          <span className="text-sm font-medium text-purple-700">YEARLY</span>
        </div>
      </div>

        {/* Code for displaying the component */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
           <div key={index} className={`rounded-xl shadow-xl bg-white p-8 transition duration-500 ${userSubscription?.packageType === pkg.name ? 'ring-4 ring-blue-500' : 'hover:shadow-2xl'}`}>
           <h3 className="text-2xl font-bold text-blue-800 mb-5">{pkg.name}</h3>


              {/* Additional package details and Subscribe button */}
              <div className="text-lg mb-5">
              <span className="font-bold">
                ${isYearly ? pkg.priceYearly : pkg.priceMonthly}
              </span>
              <span className="text-gray-600"> / {isYearly ? 'yr' : 'mo'}</span>
            </div>


              <ul className="space-y-3 mb-8">
              {features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <feature.Icon className={`text-xl mr-2 ${pkg.includes[featureIndex] ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`${pkg.includes[featureIndex] ? 'text-gray-700' : 'text-gray-400'}`}>{feature.name}</span>
                  <span className="ml-auto">
                    {pkg.includes[featureIndex] ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle className="text-gray-300" />}
                  </span>
                </li>
              ))}
              </ul>

              {userSubscription?.packageType === pkg.name ? (
              <button onClick={handleUnsubscribe} className="w-full py-3 text-white bg-red-500 rounded-lg font-medium hover:bg-red-600 transition duration-300">Unsubscribe</button>
            ) : (
              <button onClick={() => handleSubscribe(pkg.name, isYearly ? pkg.priceYearly : pkg.priceMonthly)} className="w-full py-3 text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition duration-300">Choose Plan</button>
            )}

             
            </div>
          ))}
            <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc; /* Fallback for browsers that do not support gradients */
          background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
          -webkit-transition: .4s;
          transition: .4s;
        }
        

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          -webkit-transition: .4s;
          transition: .4s;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196F3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(26px);
          -ms-transform: translateX(26px);
          transform: translateX(26px);
        }

        /* Rounded sliders */
        .slider.round {
          border-radius: 34px;
        }

        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
