// ViewCompleteDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewCompleteDetails = () => {
  const { email } = useParams();
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  console.log('EMAILLL', email);

  
  return (
    <div>
      {subscriptionDetails && (
        <div>
          <h2>Complete Subscription Details</h2>
          <ul>
            <li>Subscription Type: {subscriptionDetails.subscriptionType}</li>
            <li>Subscribed: {subscriptionDetails.subscribed.toString()}</li>
            <li>Tenure: {subscriptionDetails.tenure}</li>
            <li>Deduction Amount: {subscriptionDetails.deductionAmount}</li>
            <li>Package Type: {subscriptionDetails.packageType}</li>
            <li>User Email: {subscriptionDetails.useremail}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewCompleteDetails;
