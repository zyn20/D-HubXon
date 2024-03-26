import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthReq = () => {
  // State to store the fetched data
  const [requestData, setRequestData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/validator/fetch-requests');
      setRequestData(response.data); // Update the state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-center bg-blue-900 text-white">
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Name</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Picture as per CNIC</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Email</th>
                    <th className="text-lg font-semibold py-4 lg:py-7 px-3 lg:px-4">Legal Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map through the fetched data and render table rows */}
                  {requestData.map((request, index) => (
                    <tr key={index} className="text-center text-dark font-medium text-base">
                      <td className="py-5 px-2 bg-[#F3F6FF]">{request.FULLNAME}</td>
                      <td className="py-5 px-2 bg-white">
                        <a href={request.PROFILEURL} target="_blank" rel="noopener noreferrer">View Picture</a>
                      </td>
                      <td className="py-5 px-2 bg-[#F3F6FF]">{request.EMAIL}</td>
                      <td className="py-5 px-2 bg-white flex justify-center items-center gap-4">
                        <button onClick={() => window.open(request.FILEURL, '_blank')}>View Documents</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthReq;
