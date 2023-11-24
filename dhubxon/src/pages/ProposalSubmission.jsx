import React, { useState } from 'react';

const ProposalSubmission = () => {
  const [bidAmount, setBidAmount] = useState(200);

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmitProposal = () => {
    console.log('Submitting Proposal...');
  };

  return (
    <div className="flex justify-center items-center mt-8 ">
      <div className="w-full max-w-2xl p-6  rounded-lg shadow-md bg-blue-100 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">Submit a Proposal</h1>
        
        {/* Proposal Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Proposal Settings</h2>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-700 text-center">Bid Amount</label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="bidAmount"
                  id="bidAmount"
                  className="border-4 border-blue-400 h-10 focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm  rounded-md"
                  placeholder="0.00"
                  value={bidAmount}
                  onChange={handleBidAmountChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Job Details</h2>
          <p className="text-gray-700 mb-4 text-center">UI/UX Developer Required</p>
          <p className="text-gray-700 mb-4 text-center">Front-End Development Posted Nov 20, 2023</p>
          <p className="text-gray-700 mb-4 text-center">Description of the job...</p>
        </div>

        {/* Bid Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Bid</h2>
          <p className="text-gray-700 mb-4 text-center">Total amount the client will see on your proposal</p>
          <div className="mb-4 flex justify-center items-center">
            <span className="text-gray-500">$</span>
            <span className="text-gray-700 font-bold">{bidAmount}</span>
          </div>
          <p className="text-gray-700 mb-4 text-center">10% Freelancer Service Fee</p>
          <div className="mb-4 flex justify-center items-center">
            <span className="text-gray-500">-$</span>
            <span className="text-gray-700 font-bold">20.00</span>
          </div>
          <p className="text-gray-700 mb-4 text-center">The estimated amount you'll receive after service fees</p>
          <div className="mb-4 flex justify-center items-center">
            <span className="text-gray-500">$</span>
            <span className="text-gray-700 font-bold">180.00</span>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Cover Letter</h2>
          <textarea
            className="border-4 border-blue-400  p-4 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows="4"
            placeholder="Write your cover letter..."
          ></textarea>
        </div>

        {/* Attachments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Attachments</h2>
          <input
            type="file"
            accept=".pdf, .docx, .jpg, .png"
            className="block w-full text-sm text-gray-700 border-gray-300 rounded-md"
          />
        </div>

        {/* Boost Proposal (optional) */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-950">Boost Proposal (optional)</h2>
          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
              Boost Proposal
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleSubmitProposal}
          >
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalSubmission;
