import React from 'react';
import image from '../assets/1.png';
import Navbar_Freelancer from '../components/Freelancer/Navbar_Freelancer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cardData = [
  { title: 'Projects in Queue', content: '10' },
  { title: 'Successful Clients', content: '100' },
  { title: 'Project Invitation', content: '3' },
  { title: 'Recent Softwares', content: '100' },
  { title: 'Recent Courses', content: '1000' },
  { title: 'Courses Request', content: '31' },
  // Add more card objects as needed
];

const FreelancerDashboard = () => {
  const navigate = useNavigate();

    const renderStatisticsOverview = () => {
        return (
          <>
       <div className=" flex flex-col mx-4 space-y-1">
  {/* Freelance Courses Button */}
  <button
    className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
    onClick={() => navigate('/freelancer/courses')}
  >
    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
    Freelance Courses
  </button>

  {/* Software Products Button */}
  <button
    className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
    onClick={() => navigate('/freelancer/softwares')}
  >
    <FontAwesomeIcon icon={faLaptopCode} className="mr-2" />
    Software Products
  </button>
</div>

     
          <div className="p-4 bg-white rounded-lg shadow flex justify-around items-center">
            <div className="text-center">
              <span className="block text-2xl font-bold text-blue-500">$15,000</span>
              <span className="text-gray-600">Total Earnings</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-blue-500">320</span>
              <span className="text-gray-600">Hours Worked</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-blue-500">45</span>
              <span className="text-gray-600">Positive Reviews</span>
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
                <p><span className="font-medium">Completed:</span> 'Website Redesign' for Client X.</p>
              </div>
              <div className="flex items-center bg-green-100 rounded p-3">
                <div className="p-2 rounded-full bg-green-500 text-white mr-3">$</div>
                <p><span className="font-medium">Payment Received:</span> for 'Logo Design' project.</p>
              </div>
              <div className="flex items-center bg-yellow-100 rounded p-3">
                <div className="p-2 rounded-full bg-yellow-500 text-white mr-3">✉</div>
                <p><span className="font-medium">New Message:</span> from Client Y about project details.</p>
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
              <p><strong>Current Projects:</strong> <span className="text-blue-600">3 active</span></p>
              {/* Replace below divs with actual progress bars */}
              <div className="bg-gray-200 rounded h-2 w-full">
                <div className="bg-blue-600 h-2 rounded" style={{ width: '60%' }}></div>
              </div>
              <p><strong>Pending Invitations:</strong> <span className="text-yellow-600">2 pending</span></p>
              <div className="bg-gray-200 rounded h-2 w-full">
                <div className="bg-yellow-600 h-2 rounded" style={{ width: '30%' }}></div>
              </div>
              <p><strong>Completed Projects:</strong> <span className="text-green-600">12 completed</span></p>
              <div className="bg-gray-200 rounded h-2 w-full">
                <div className="bg-green-600 h-2 rounded" style={{ width: '100%' }}></div>
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
                <p>New message from Client Z regarding project proposal.</p>
              </div>
              <div className="flex items-center bg-red-100 rounded p-3">
                <div className="p-2 rounded-full bg-red-500 text-white mr-3">⚠</div>
                <p>Reminder: Project deadline for 'Mobile App Development' is tomorrow.</p>
              </div>
              <div className="flex items-center bg-green-100 rounded p-3">
                <div className="p-2 rounded-full bg-green-500 text-white mr-3">✔</div>
                <p>Your profile has been viewed 20 times this week.</p>
              </div>
            </div>
          </div>
        );
      };
      
      
      
      const renderProfileAndPortfolio = () => {
        return (
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Profile and Portfolio</h3>
            <div className="space-y-3">
              <p><strong>Name:</strong> <span className="text-gray-800">Zain the Freelancer</span></p>
              <p><strong>Skills:</strong> <span className="text-gray-800">Web Development, Graphic Design, SEO</span></p>
              <div className="flex space-x-2">
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">Web Development</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Graphic Design</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">SEO</span>
              </div>
              <p><strong>Portfolio:</strong> <span className="text-gray-800">15 projects completed</span></p>
              {/* Potential place for portfolio images or links */}
            </div>
          </div>
        );
      };
      


  return (
    <div className="flex flex-col items-center bg-gray-100">

  
      <Navbar_Freelancer />
    
      {/* Banner Section */}
      <div className="w-full max-w-[1400px] h-[200px] bg-blue-900 rounded-xl overflow-hidden flex justify-center mt-[100px] items-center my-10">
        <div className="z-10 text-white text-center">
          <p className='text-xl lg:text-3xl font-poppins'>Welcome to Freelancer Dashboard</p>
          <p className='text-xl lg:text-3xl font-poppins'>Good Evening Zain!</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[1400px] px-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="flex flex-col justify-between h-48 w-full max-w-sm mx-auto p-6 bg-blue-200 hover:bg-blue-300 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
                <h4 className="text-4xl font-bold text-gray-700 dark:text-gray-400 mb-4">{card.content}</h4>
                <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
                  Browse Now
                </button>
              </div>
            </div>
          ))}
        </div>



        <div className="mt-5 w-full max-w-[1400px] space-y-4">
        {renderStatisticsOverview()}
        {renderRecentActivityFeed()}
        {renderProjectManagementSection()}
        {renderMessageCenter()}
        {renderProfileAndPortfolio()}
      </div>
      </div>
    </div>
  )
}

export default FreelancerDashboard;
