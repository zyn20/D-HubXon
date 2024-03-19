


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './proposalcards';

const Proposal = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Function to fetch proposals
    const fetchProposals = async () => {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token'); // Ensure 'token' is the key you've used to save your token

      // Check for the token's existence
      if (!token) {
        console.error('No token found in local storage.');
        // Handle lack of token, e.g., redirect to login
        return;
      }

      try {
        // Endpoint where your API is hosted
        const endpoint = 'http://127.0.0.1:5000/client/projects';
        
        // Make the API call with the token in the request body
        const response = await axios.post(endpoint, { token });
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        // Handle error, e.g., set error state, show notification, etc.
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {/* Map through the proposals state array and render a Card for each proposal */}
      {proposals.map((proposal) => (
        <Card
          key={proposal.id}
          id={proposal.id}
          status={proposal.status}
          title={proposal.title}
          balance={proposal.budget}
          color="green" // Use logic here if you want to determine color based on some property
          duration={proposal.projectDuration}
          pricingType={proposal.pricingType}
        />
      ))}
    </div>
  );
};

export default Proposal;
