import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TableComponent = () => {
  const [proposal, setProposal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposal = async () => {
      const taken = localStorage.getItem('taken');
      if (!taken) {
        console.error('No taken value found in local storage.');
        return;
      }
      try {
        const response = await axios.post('http://127.0.0.1:5000/client/oneproposals', { taken });
        setProposal(response.data); // Adjust based on actual response structure
      } catch (error) {
        console.error('Error fetching proposal:', error);
      }
    };
    fetchProposal();
  }, []);

  const handleConfirmAccept = async () => {
    if (!proposal) return;

    try {
      await axios.post('http://127.0.0.1:5000/client/update-project', {
        id: proposal.PROJECTID,
        takenby: proposal.PROPOSALOWNER,
      });
      navigate(`/successPage`, { replace: true });
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  if (!proposal) return <div>Loading...</div>;

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-center bg-green-500 text-white">
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">ID</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Bid Amount</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Email</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-dark font-medium text-base">
                    <td className="py-5 px-2 bg-[#F3F6FF]">{proposal.PROJECTID}</td>
                    <td className="py-5 px-2 bg-white">${proposal.BIDAMOUNT}</td>
                    <td className="py-5 px-2 bg-[#F3F6FF]">{proposal.PROPOSALOWNER}</td>
                    <td className="py-5 px-2 bg-white flex justify-center items-center gap-4">
                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableComponent;
