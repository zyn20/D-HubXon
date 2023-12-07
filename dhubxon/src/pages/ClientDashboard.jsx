import React from 'react';
import image from '../assets/1.png';


const cardData = [
  { title: 'Ongoing Projects', content: '5' },
  { title: 'Completed Projects', content: '15' },
  { title: 'Pending Proposals', content: '2' },
  { title: 'New Messages', content: '7' },
  // Add more card objects as needed
];

const ClientDashboard = () => {
  const renderProjectOverview = () => {
    return (

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
          <p><strong>Company Name:</strong> <span className="text-gray-800">ABC Corp</span></p>
          <p><strong>Industry:</strong> <span className="text-gray-800">Technology</span></p>
          <p><strong>Projects Posted:</strong> <span className="text-gray-800">20</span></p>
          {/* Potential place for project details or links */}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-gray-100">
      {/* Banner Section */}
      <div className="w-full max-w-[1400px] h-[200px] bg-green-700 rounded-xl overflow-hidden flex justify-center items-center my-10">
        <div className="z-10 text-white text-center">
          <p className='text-xl lg:text-3xl font-poppins'>Welcome to Client Dashboard</p>
          <p className='text-xl lg:text-3xl font-poppins'>Hello ABC Corp!</p>
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
  );
}

export default ClientDashboard;
