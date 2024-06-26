import React from 'react';
import image from '../assets/1.png';
import Navbar_Client from '../components/client/Navbar';
import { useNavigate } from 'react-router-dom';
import { faGraduationCap, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {jwtDecode} from 'jwt-decode';


const cardData = [
  { title: 'Ongoing Projects', content: '1' },
  { title: 'Completed Projects', content: '1' },
  { title: 'Pending Proposals', content: '2' },
  { title: 'New Messages', content: '0' },
  // Add more card objects as needed
];
 
const ClientDashboard = () => {



  const navigate = useNavigate();


const token = localStorage.getItem('token');
if (!token) {
  console.error('No token found');
  return;
}
const decodedToken = jwtDecode(token);
let ProjectOwner, ClientName;

if (decodedToken.clientData) {
 
  ClientName = decodedToken.clientData.name;
  
}



 
  const renderProjectOverview = () => {
    return (
<>

<div className=" flex flex-col mx-4 space-y-1">
  {/* Freelance Courses Button */}
  <button
    className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
    onClick={() => navigate('/client/explore-courses')}
  >
    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
    Explore Courses Offered by our Experienced Freelancer
  </button>

  {/* Software Products Button */}
  <button
    className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
    onClick={() => navigate('/softwareproducts')}
  >
    <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
    Explore Software Products Marketplace
  </button>
</div>


      <div className="p-4 bg-white rounded-lg shadow flex justify-around items-center">
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-500">5</span>
          <span className="text-gray-600">Ongoing Projects</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-500">15</span>
          <span className="text-gray-600">Completed Projects</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-blue-500">2</span>
          <span className="text-gray-600">Pending Proposals</span>
        </div>
      </div>
      </>
    );
  };

  const renderRecentActivityFeed = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center bg-blue-100 rounded p-3">
            <div className="p-2 rounded-full bg-blue-500 text-white mr-3">✓</div>
            <p><span className="font-medium">Project Update:</span> 'Website Redesign' is in progress.</p>
          </div>
          <div className="flex items-center bg-green-100 rounded p-3">
            <div className="p-2 rounded-full bg-green-500 text-white mr-3">$</div>
            <p><span className="font-medium">Payment Sent:</span> for 'Logo Design' project.</p>
          </div>
          <div className="flex items-center bg-yellow-100 rounded p-3">
            <div className="p-2 rounded-full bg-yellow-500 text-white mr-3">✉</div>
            <p><span className="font-medium">New Proposal:</span> from Freelancer X for your project.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderProjectManagementSection = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Project Management</h3>
        <div className="space-y-3">
          <p><strong>Ongoing Projects:</strong> <span className="text-blue-600">5 active</span></p>
          {/* Replace below divs with actual progress bars */}
          <div className="bg-gray-200 rounded h-2 w-full">
            <div className="bg-blue-600 h-2 rounded" style={{ width: '40%' }}></div>
          </div>
          <p><strong>Completed Projects:</strong> <span className="text-green-600">15 completed</span></p>
          <div className="bg-gray-200 rounded h-2 w-full">
            <div className="bg-green-600 h-2 rounded" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    );
  };

  const renderMessageCenter = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Messages & Notifications</h3>
        <div className="space-y-3">
          {/* Each message can be a button or link */}
          <div className="flex items-center bg-yellow-100 rounded p-3">
            <div className="p-2 rounded-full bg-yellow-500 text-white mr-3">✉</div>
            <p>New proposal from Freelancer Y for your project.</p>
          </div>
          <div className="flex items-center bg-red-100 rounded p-3">
            <div className="p-2 rounded-full bg-red-500 text-white mr-3">⚠</div>
            <p>Reminder: Approve the design for 'Mobile App Development' project.</p>
          </div>
          <div className="flex items-center bg-green-100 rounded p-3">
            <div className="p-2 rounded-full bg-green-500 text-white mr-3">✔</div>
            <p>Your project 'E-commerce Website' has received positive feedback.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderProfileAndProjects = () => {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Profile and Projects</h3>
        <div className="space-y-3">
          <p><strong>Company Name:</strong> <span className="text-gray-800">${ClientName}</span></p>
          <p><strong>Industry:</strong> <span className="text-gray-800">Technology</span></p>
          <p><strong>Projects Posted:</strong> <span className="text-gray-800">20</span></p>
          {/* Potential place for project details or links */}
        </div>
      </div>
    );
  };

  return (
    <>
    <Navbar_Client />
    <div className="flex flex-col items-center bg-gray-100">
     
      {/* Banner Section */}
      <div className="w-full max-w-[1400px] h-[200px] bg-green-700 rounded-xl overflow-hidden flex justify-center items-center my-10">
        <div className="z-10 text-white text-center">
          <p className='text-xl lg:text-3xl font-poppins'>Welcome to Client Dashboard</p>
          <p className='text-xl lg:text-3xl font-poppins'>{ClientName}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[1400px] px-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col justify-between h-48 w-full max-w-sm mx-auto p-6 bg-green-200 hover:bg-green-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                <h4 className="text-4xl font-bold text-gray-700 dark:text-gray-400 mb-4">{card.content}</h4>
                <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 w-full max-w-[1400px] space-y-4">
       
          {renderProjectOverview()}
          {renderRecentActivityFeed()}
          {renderProjectManagementSection()}
          {renderMessageCenter()}
          {renderProfileAndProjects()}
        </div>
      </div>
    </div>
    </>
  );
}

export default ClientDashboard;
































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import image from '../assets/1.png';
// import Navbar_Client from '../components/client/Navbar';
// import { useNavigate } from 'react-router-dom';
// import { faGraduationCap, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { jwtDecode } from 'jwt-decode';

// const ClientDashboard = () => {
//   const [ongoingProjectsCount, setOngoingProjectsCount] = useState(0);
//   const [completedProjectsCount, setCompletedProjectsCount] = useState(0);
//   const [pendingProposalsCount, setPendingProposalsCount] = useState(0);
//   const [newMessagesCount, setNewMessagesCount] = useState(0);
//   const [requestData, setRequestData] = useState(null);
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   // Fetch data when the component mounts
   
//   // }, [ongoingProjectsCount,completedProjectsCount,pendingProposalsCount]);


  

//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.error('No token found');
//     return;
//   }
//   const decodedToken = jwtDecode(token);
//   let ProjectOwner, ClientName;

//   if (decodedToken.clientData) {
//     ProjectOwner = decodedToken.clientData.email;
//     ClientName = decodedToken.clientData.name;
    
//   }

//   const fetchProjectCounts = async () => {
//     try {
//       const [ongoingResponse, completedResponse, proposalsResponse] = await Promise.all([
//         axios.get(`http://localhost:5000/client/dashboard/ongoing/${ProjectOwner}`),
//         axios.get(`http://localhost:5000/client/dashboard/completed/${ProjectOwner}`),
//         axios.get(`http://localhost:5000/client/dashboard/proposals/${ProjectOwner}`),
//       ]);
//       setOngoingProjectsCount(ongoingResponse.data.count);
//       console.log("heloow",ongoingProjectsCount)
//       console.log(ProjectOwner)
//       setCompletedProjectsCount(completedResponse.data.count);
//       setPendingProposalsCount(proposalsResponse.data.count);
//       // Fetch other counts similarly
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };



 
//   const renderProjectOverview = () => {
//     return (
// <>

// <div className=" flex flex-col mx-4 space-y-1">
//   {/* Freelance Courses Button */}
//   <button
//     className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
//     onClick={() => navigate('/client/explore-courses')}
//   >
//     <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
//     Explore Courses Offered by our Experienced Freelancer
//   </button>

//   {/* Software Products Button */}
//   <button
//     className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
//     onClick={() => navigate('/softwareproducts')}
//   >
//     <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
//     Explore Software Products Marketplace
//   </button>
// </div>


//       <div className="p-4 bg-white rounded-lg shadow flex justify-around items-center">
//         <div className="text-center">
//           <span className="block text-2xl font-bold text-blue-500">5</span>
//           <span className="text-gray-600">Ongoing Projects</span>
//         </div>
//         <div className="text-center">
//           <span className="block text-2xl font-bold text-blue-500">15</span>
//           <span className="text-gray-600">Completed Projects</span>
//         </div>
//         <div className="text-center">
//           <span className="block text-2xl font-bold text-blue-500">2</span>
//           <span className="text-gray-600">Pending Proposals</span>
//         </div>
//       </div>
//       </>
//     );
//   };

//   const renderRecentActivityFeed = () => {
//     return (
//       <div className="p-4 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4 text-blue-700">Recent Activity</h3>
//         <div className="space-y-3">
//           <div className="flex items-center bg-blue-100 rounded p-3">
//             <div className="p-2 rounded-full bg-blue-500 text-white mr-3">✓</div>
//             <p><span className="font-medium">Project Update:</span> 'Website Redesign' is in progress.</p>
//           </div>
//           <div className="flex items-center bg-green-100 rounded p-3">
//             <div className="p-2 rounded-full bg-green-500 text-white mr-3">$</div>
//             <p><span className="font-medium">Payment Sent:</span> for 'Logo Design' project.</p>
//           </div>
//           <div className="flex items-center bg-yellow-100 rounded p-3">
//             <div className="p-2 rounded-full bg-yellow-500 text-white mr-3">✉</div>
//             <p><span className="font-medium">New Proposal:</span> from Freelancer X for your project.</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderProjectManagementSection = () => {
//     return (
//       <div className="p-4 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4 text-blue-700">Project Management</h3>
//         <div className="space-y-3">
//           <p><strong>Ongoing Projects:</strong> <span className="text-blue-600">5 active</span></p>
//           {/* Replace below divs with actual progress bars */}
//           <div className="bg-gray-200 rounded h-2 w-full">
//             <div className="bg-blue-600 h-2 rounded" style={{ width: '40%' }}></div>
//           </div>
//           <p><strong>Completed Projects:</strong> <span className="text-green-600">15 completed</span></p>
//           <div className="bg-gray-200 rounded h-2 w-full">
//             <div className="bg-green-600 h-2 rounded" style={{ width: '80%' }}></div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderMessageCenter = () => {
//     return (
//       <div className="p-4 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4 text-blue-700">Messages & Notifications</h3>
//         <div className="space-y-3">
//           {/* Each message can be a button or link */}
//           <div className="flex items-center bg-yellow-100 rounded p-3">
//             <div className="p-2 rounded-full bg-yellow-500 text-white mr-3">✉</div>
//             <p>New proposal from Freelancer Y for your project.</p>
//           </div>
//           <div className="flex items-center bg-red-100 rounded p-3">
//             <div className="p-2 rounded-full bg-red-500 text-white mr-3">⚠</div>
//             <p>Reminder: Approve the design for 'Mobile App Development' project.</p>
//           </div>
//           <div className="flex items-center bg-green-100 rounded p-3">
//             <div className="p-2 rounded-full bg-green-500 text-white mr-3">✔</div>
//             <p>Your project 'E-commerce Website' has received positive feedback.</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderProfileAndProjects = () => {
//     return (
//       <div className="p-4 bg-white rounded-lg shadow">
//         <h3 className="text-lg font-semibold mb-4 text-blue-700">Profile and Projects</h3>
//         <div className="space-y-3">
//           <p><strong>Company Name:</strong> <span className="text-gray-800">${ClientName}</span></p>
//           <p><strong>Industry:</strong> <span className="text-gray-800">Technology</span></p>
//           <p><strong>Projects Posted:</strong> <span className="text-gray-800">20</span></p>
//           {/* Potential place for project details or links */}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Navbar_Client />
//       <div className="flex flex-col items-center bg-gray-100">
//         {/* Banner Section */}
//         <div className="w-full max-w-[1400px] h-[200px] bg-green-700 rounded-xl overflow-hidden flex justify-center items-center my-10">
//           <div className="z-10 text-white text-center">
//             <p className='text-xl lg:text-3xl font-poppins'>Welcome to Client Dashboard</p>
//             <p className='text-xl lg:text-3xl font-poppins'>{ClientName}</p>
//           </div>
//         </div>
//         {/* Cards Section */}
//         <div className="w-full max-w-[1400px] px-4 mb-5">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="flex flex-col justify-between h-48 w-full max-w-sm mx-auto p-6 bg-green-200 hover:bg-green-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//               <div className="text-center">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ongoing Projects</h5>
//                 <h4 className="text-4xl font-bold text-gray-700 dark:text-gray-400 mb-4">{ongoingProjectsCount}</h4>
//                 <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors">
//                   View Details
//                 </button>
//               </div>
//             </div>

          


//             <div className="flex flex-col justify-between h-48 w-full max-w-sm mx-auto p-6 bg-green-200 hover:bg-green-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//               <div className="text-center">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Completed Projects</h5>
//                 <h4 className="text-4xl font-bold text-gray-700 dark:text-gray-400 mb-4">{completedProjectsCount}</h4>
//                 <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors">
//                   View Details
//                 </button>
//               </div>
//             </div>







//             <div className="flex flex-col justify-between h-48 w-full max-w-sm mx-auto p-6 bg-green-200 hover:bg-green-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//               <div className="text-center">
//                 <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pending Projects</h5>
//                 <h4 className="text-4xl font-bold text-gray-700 dark:text-gray-400 mb-4">{pendingProposalsCount}</h4>
//                 <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors">
//                   View Details
//                 </button>
//               </div>
//             </div>


//           </div>
       

//           <div className="mt-5 w-full max-w-[1400px] space-y-4">
       
//        {renderProjectOverview()}
//        {renderRecentActivityFeed()}
//        {renderProjectManagementSection()}
//        {renderMessageCenter()}
//        {renderProfileAndProjects()}
//      </div>


//         </div>
//       </div>
//     </>
//   );
// }

// export default ClientDashboard;












