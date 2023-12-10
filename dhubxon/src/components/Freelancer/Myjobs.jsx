



import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Freelancer_Navbar from '../Freelancer/Navbar_Freelancer'

const MyJobs = () => {
  const jobs = [
    {
        id: 1,
        title: 'Web Development Project',
        description: 'Build a responsive website using React',
        budget: '$1000 - $1500',
        status: 'In Progress',
      },
      {
        id: 2,
        title: 'Graphic Design Task',
        description: 'Create a logo and branding materials',
        budget: '$500 - $800',
        status: 'Completed',
      },
      {
        id: 3,
        title: 'Mobile App Development',
        description: 'Develop a cross-platform mobile app',
        budget: '$2000 - $2500',
        status: 'Pending',
      },
  ];

  const statusIcons = {
    'In Progress': <FontAwesomeIcon icon={faClock} className="text-blue-500" />,
    'Completed': <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />,
    'Pending': <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" />,
  };

  return (
    <>
    <Freelancer_Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Jobs</h1>
      {jobs.map(job => (
        <div key={job.id} className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700">{job.title}</h2>
          <p className="text-gray-600">{job.description}</p>
          <p className="text-gray-600">Budget: {job.budget}</p>
          <div className="flex items-center mt-2">
            {statusIcons[job.status]}
            <p className="text-gray-600 ml-2">Status: {job.status}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default MyJobs;
