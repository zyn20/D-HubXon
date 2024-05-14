


import React, { useState, useEffect } from 'react';
import Navbar_Client from '../components/client/Navbar';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import Card from './proposalcards';

const Proposal = () => {
  const [proposals, setProposals] = useState([]);
  const location = useLocation(); // Access the current location object

  useEffect(() => {
    // A function to parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const refreshParam = queryParams.get('refresh'); // Access a specific query parameter, e.g., 'refresh'

    const fetchProposals = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in local storage.');
        return;
      }

      try {
        const endpoint = 'http://127.0.0.1:5000/client/projects';
        const response = await axios.post(endpoint, { token });
        setProposals(response.data);
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, [location]); // Add `location` as a dependency to `useEffect` to re-fetch data when the query parameters change

  return (
    <>
    <Navbar_Client/>
    <div className="flex flex-wrap justify-center mt-10">
      {proposals.map((proposal) => (
        <Card
          key={proposal.id}
          id={proposal.id}
          status={proposal.status}
          takenby={proposal.takenby}
          title={proposal.title}
          balance={proposal.budget}
          projectDeadline={proposal.projectDeadline}
          color="green"
          duration={proposal.projectDuration}
          pricingType={proposal.pricingType}
          workurl={proposal.submitedwork}
        />
      ))}
    </div>
    </>
  );
};
export default Proposal;