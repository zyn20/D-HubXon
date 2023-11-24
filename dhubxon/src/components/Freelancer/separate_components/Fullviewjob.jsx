import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaMoneyBillWave, FaUserTie,FaFileContract } from 'react-icons/fa';
import { MdOutlineDesignServices } from 'react-icons/md';
import { GiSkills } from 'react-icons/gi';
import {  FaClock, FaMapMarkerAlt, FaRegCalendarAlt, FaRegListAlt } from 'react-icons/fa';

const Fullviewjob = () => {
  return (
    <div className="container mx-auto p-8  shadow-lg rounded-lg bg-blue-100 mb-8 mt-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
          <FaBriefcase className="mr-2" /> UX/UI Developer
        </h1>
        <p className="text-gray-600 flex items-center">
          <FaCalendarAlt className="mr-2" /> Posted yesterday
        </p>
      </div>

      <div className="mb-8">
        <p className="text-gray-600">
          StreamlineConnect is a cutting-edge communication platform that aims to revolutionize the way teams collaborate and communicate in the modern workplace. Our goal is to enhance user experience and improve overall efficiency through intuitive design and seamless interaction.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <MdOutlineDesignServices className="mr-2" /> Job Details
      </h2>
      <p className="text-gray-600 mb-8">I am having a website in which we have member and the admin panel. Already project is integrated with the backend. I want someone who can redesign all panel pages again and can give me clean code.</p>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaMoneyBillWave className="mr-2" /> Budget
      </h2>
      <p className="text-gray-600 mb-8">$200.00</p>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <GiSkills className="mr-2" /> Skills and Expertise
      </h2>
      <ul className="list-disc list-inside text-gray-600 mb-8">
        <li>CSS</li>
        <li>HTML5</li>
        <li>JavaScript</li>
        <li>HTML</li>
        <li>Figma</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaUserTie className="mr-2" /> Activity on this job
      </h2>
      {/* Rest of the Activity details */}

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contract Details</h2>
   {/* ... existing content ... */}

   <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
  <FaFileContract className="mr-2" /> Contract Details
</h2>

<div className="bg-blue-200 p-4 rounded-md border border-gray-300">
  <div className="mb-4">
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaRegCalendarAlt className="mr-2" /> Project Type
    </h3>
    <p className="text-gray-600">One-time project</p>
  </div>

  <div className="mb-4">
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaRegListAlt className="mr-2" /> Skills and Expertise Level
    </h3>
    <p className="text-gray-600">Entry level</p>
  </div>

  <div className="mb-4">
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaClock className="mr-2" /> Duration
    </h3>
    <p className="text-gray-600">Estimated 2-3 weeks</p>
  </div>

  <div className="mb-4">
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaClock className="mr-2" /> Work Hours
    </h3>
    <p className="text-gray-600">Flexible, but regular updates required</p>
  </div>

  <div className="mb-4">
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaMapMarkerAlt className="mr-2" /> Location
    </h3>
    <p className="text-gray-600">Remote work allowed</p>
  </div>

  <div>
    <h3 className="text-gray-700 font-semibold flex items-center">
      <FaFileContract className="mr-2" /> Contract-to-hire opportunity
    </h3>
    <p className="text-gray-600">This job could become full time.</p>
  </div>
</div>

<button className="bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-md transition ease-in-out duration-300 mt-4">
  Apply Now
</button>

{/* ... */}

    </div>
  );
};

export default Fullviewjob;
