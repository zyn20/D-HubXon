
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Freelancer_Navbar from '../Freelancer/Navbar_Freelancer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const colorClasses = {
  green: {
    text: 'text-green-500',
    bg: 'bg-green-400',
    hoverBg: 'hover:bg-green-500',
    shadow: 'shadow-green-400',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-400',
  },
  blue: {
    text: 'text-blue-500',
    bg: 'bg-blue-400',
    hoverBg: 'hover:bg-blue-500',
    shadow: 'shadow-blue-400',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-400',
  },
};

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const classes = colorClasses.green;
  const [document, setDocument] = useState(null); // State to hold the selected document

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const email = decodedToken.freelancerData.email;
        const response = await axios.get('http://127.0.0.1:5000/freelancer/getprojectbytakenby', {
          params: { takenby: email }
        });
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const uploadDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hixrhbq4");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dig2awru0/image/upload",
        formData
      );

      console.log("Cloudinary Response is:", response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  };

  const handleUpload = async () => {
    try {
      if (!document) {
        console.error("No document selected.");
        return;
      }
      
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const email = decodedToken?.freelancerData?.email; // Add null check using optional chaining
  
      if (!email) {
        console.error("Email not found in token.");
        return;
      }
  
      const documentUrl = await uploadDocument(document);
      const response = await axios.post('http://127.0.0.1:5000/freelancer/updateproject_work', { email: email, workurl: documentUrl }); // Pass email and documentUrl in the request body
      console.log("Uploaded document URL:", documentUrl);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };
  

  const statusIcons = {
    'Active': <FontAwesomeIcon icon={faClock} className="text-blue-500" />,
    'Done': <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />,
    'Pending': <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" />,
  };

  return (
    <>
      <Freelancer_Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Jobs</h1>
        {jobs.map(job => (
          <div key={job.id} className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700">{job.title}</h2>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-600">Budget: {job.budget}$</p>
            <div className="flex items-center mt-2">
              {statusIcons[job.status]}
              <p className="text-gray-600 ml-2">Status: {job.status}</p>
            </div>
            {job.status === 'Active' && (
  <>
    <form>
      <div className="flex items-center space-x-6">
        <label className="block">
          <input 
            type="file" 
            onChange={(e) => setDocument(e.target.files[0])} 
            // accept="" 
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" 
          />
        </label>
      </div>
    </form>
    <button 
      className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
      onClick={handleUpload} // Call handleUpload when clicked
    >
      Submit Your Work
    </button>
  </>
)}

          </div>
        ))}
      </div>
    </>
  );
};

export default MyJobs;


