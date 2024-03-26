import React from "react";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";

const SubscribeButton = ({ handleSubscribe, subscriptionType, isYearly }) => {
  const handleSubscription = async () => {
    try {
      await handleSubscribe();
    } catch (error) {
      console.error("Subscription error:", error);
      Swal.fire(
        "Subscription failed",
        "There was a problem with your subscription.",
        "error"
      );
    }
  };

  return (
    <button
      onClick={handleSubscription}
      className="w-full py-3 text-white bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
    >
      Subscribe
    </button>
  );
};

const UnsubscribeButton = ({ handleUnsubscribe, subscriptionType }) => {
  const handleUnsubscription = async () => {
    try {
      await handleUnsubscribe();
    } catch (error) {
      console.error("Unsubscription error:", error);
      Swal.fire(
        "Unsubscribe failed",
        "There was a problem with your unsubscription.",
        "error"
      );
    }
  };

  return (
    <button
      onClick={handleUnsubscription}
      className="w-full py-3 text-white bg-red-500 rounded-lg font-medium hover:bg-red-600 transition duration-300"
    >
      Unsubscribe
    </button>
  );
};

export { SubscribeButton, UnsubscribeButton };
